#!/usr/bin/env python3
"""
Enhanced LaTeX checker for courseContent-fisica.ts
Finds ACTUAL syntax errors that cause red rendering, not false positives.
"""

import re
import sys
from pathlib import Path

def find_latex_errors(content: str) -> list:
    """Find actual LaTeX syntax errors that will cause red rendering."""
    errors = []
    lines = content.split('\n')
    
    for line_num, line in enumerate(lines, 1):
        # Extract all LaTeX formulas
        # Display math: $$...$$
        for match in re.finditer(r'\$\$([^$]+)\$\$', line):
            formula = match.group(1)
            check_formula(formula, line_num, 'display', errors)
        
        # Inline math: $...$
        inline_line = re.sub(r'\$\$[^$]+\$\$', '', line)
        for match in re.finditer(r'\$([^$]+)\$', inline_line):
            formula = match.group(1)
            check_formula(formula, line_num, 'inline', errors)
    
    return errors

def check_formula(formula: str, line_num: int, math_type: str, errors: list):
    """Check a single formula for actual syntax errors."""
    
    # ERROR 1: Double subscript/superscript like ^{B}_{A} or _{A}^{B}_{C}
    # This pattern finds cases where there are multiple sub/superscripts in a row
    # that would be invalid
    double_script_pattern = r'(\^{[^}]*})\s*(_\{[^}]*\})\s*(\^{|\_{)'
    if re.search(double_script_pattern, formula):
        errors.append({
            'line': line_num,
            'type': math_type,
            'error': 'Double subscript/superscript - invalid syntax like ^{X}_{Y}_{Z}',
            'formula': formula[:100] + '...' if len(formula) > 100 else formula
        })
    
    # ERROR 2: Integral with weird limits like \int_{}^{}_{} 
    weird_integral = r'\\int_\{[^}]*\}\^\{[^}]*\}_\{[^}]*\}'
    if re.search(weird_integral, formula):
        errors.append({
            'line': line_num,
            'type': math_type,
            'error': 'Invalid integral limits: \\int_{X}^{Y}_{Z} - should be \\int_{X}^{Y}',
            'formula': formula[:100] + '...' if len(formula) > 100 else formula
        })
    
    # ERROR 3: Multiple superscripts in sequence ^{A}^{B}
    multi_super = r'\^\{[^}]*\}\s*\^\{[^}]*\}'
    if re.search(multi_super, formula):
        errors.append({
            'line': line_num,
            'type': math_type,
            'error': 'Multiple superscripts ^{A}^{B} - invalid syntax',
            'formula': formula[:100] + '...' if len(formula) > 100 else formula
        })
    
    # ERROR 4: Multiple subscripts in sequence _{A}_{B}
    multi_sub = r'_\{[^}]*\}\s*_\{[^}]*\}'
    if re.search(multi_sub, formula):
        errors.append({
            'line': line_num,
            'type': math_type,
            'error': 'Multiple subscripts _{A}_{B} - invalid syntax',
            'formula': formula[:100] + '...' if len(formula) > 100 else formula
        })
    
    # ERROR 5: Unbalanced braces
    open_count = formula.count('{')
    close_count = formula.count('}')
    if open_count != close_count:
        errors.append({
            'line': line_num,
            'type': math_type,
            'error': f'Unbalanced braces: {open_count} open, {close_count} close',
            'formula': formula[:100] + '...' if len(formula) > 100 else formula
        })
    
    # ERROR 6: Empty subscript or superscript like _{ } or ^{ }
    empty_script = r'(_\{\s*\}|\^\{\s*\})'
    if re.search(empty_script, formula):
        errors.append({
            'line': line_num,
            'type': math_type,
            'error': 'Empty subscript or superscript: _{ } or ^{ }',
            'formula': formula[:100] + '...' if len(formula) > 100 else formula
        })
    
    # ERROR 7: Unclosed \begin without matching \end
    begin_envs = re.findall(r'\\begin\{([^}]+)\}', formula)
    end_envs = re.findall(r'\\end\{([^}]+)\}', formula)
    for env in begin_envs:
        if begin_envs.count(env) > end_envs.count(env):
            errors.append({
                'line': line_num,
                'type': math_type,
                'error': f'Unclosed environment: \\begin{{{env}}} without matching \\end{{{env}}}',
                'formula': formula[:100] + '...' if len(formula) > 100 else formula
            })
    
    # ERROR 8: Missing argument for commands that require them
    missing_arg_commands = [
        (r'\\frac\s*\{[^}]*\}\s*$', '\\frac missing second argument'),
        (r'\\sqrt\s*$', '\\sqrt missing argument'),
        (r'\\mathbf\s*$', '\\mathbf missing argument'),
        (r'\\text\s*$', '\\text missing argument'),
        (r'\\overrightarrow\s*$', '\\overrightarrow missing argument'),
    ]
    for pattern, msg in missing_arg_commands:
        if re.search(pattern, formula):
            errors.append({
                'line': line_num,
                'type': math_type,
                'error': msg,
                'formula': formula[:100] + '...' if len(formula) > 100 else formula
            })

def find_specific_patterns(content: str) -> list:
    """Find specific problematic patterns the user mentioned."""
    issues = []
    lines = content.split('\n')
    
    for line_num, line in enumerate(lines, 1):
        # Pattern 1: \int_{\mathcal{L}}^{P_2}_{P_1} - wrong order/duplicate limits
        if re.search(r'\\int_\{[^}]*\}\^\{[^}]*\}_\{[^}]*\}', line):
            issues.append({
                'line': line_num,
                'issue': 'Invalid integral with triple limits: \\int_{X}^{Y}_{Z}',
                'content': line.strip()[:150]
            })
        
        # Pattern 2: \oint followed by triple limits
        if re.search(r'\\oint_\{[^}]*\}\^\{[^}]*\}_\{[^}]*\}', line):
            issues.append({
                'line': line_num,
                'issue': 'Invalid oint with triple limits: \\oint_{X}^{Y}_{Z}',
                'content': line.strip()[:150]
            })
    
    return issues

def main():
    file_path = Path('/home/zonar/projects/bookofnotes/data/courseContent-fisica.ts')
    
    if not file_path.exists():
        print(f"Error: File not found: {file_path}")
        sys.exit(1)
    
    content = file_path.read_text(encoding='utf-8')
    
    print("=" * 80)
    print("ENHANCED LaTeX Error Checker for courseContent-fisica.ts")
    print("=" * 80)
    print()
    
    # Find actual syntax errors
    errors = find_latex_errors(content)
    
    # Find specific problematic patterns
    specific_issues = find_specific_patterns(content)
    
    if errors:
        print(f"FOUND {len(errors)} ACTUAL SYNTAX ERRORS (these WILL render red):")
        print("-" * 80)
        for err in sorted(errors, key=lambda x: x['line']):
            print(f"\nLine {err['line']} [{err['type']}]:")
            print(f"  ERROR: {err['error']}")
            print(f"  Formula: {err['formula']}")
    else:
        print("✅ No syntax errors found in LaTeX formulas")
    
    print()
    
    if specific_issues:
        print(f"FOUND {len(specific_issues)} SPECIFIC PROBLEMATIC PATTERNS:")
        print("-" * 80)
        for issue in sorted(specific_issues, key=lambda x: x['line']):
            print(f"\nLine {issue['line']}:")
            print(f"  Issue: {issue['issue']}")
            print(f"  Content: {issue['content']}")
    
    print()
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Actual syntax errors: {len(errors)}")
    print(f"Specific problematic patterns: {len(specific_issues)}")
    
    # Search for common patterns that cause issues
    print()
    print("SEARCHING FOR COMMON PROBLEMATIC PATTERNS...")
    print("-" * 80)
    
    # Count specific error patterns
    pattern_counts = {
        r'\\int_\{[^}]*\}\^\{[^}]*\}_\{': ('Triple integral limits pattern', 0),
        r'\\mathcal\{L\}.*_\{P': ('Mathcal L with subscript P pattern', 0),
    }
    
    for pattern, (desc, _) in pattern_counts.items():
        matches = re.findall(pattern, content)
        if matches:
            print(f"  {desc}: {len(matches)} occurrences")
            # Show first 3 lines with this pattern
            for line_num, line in enumerate(content.split('\n'), 1):
                if re.search(pattern, line):
                    print(f"    Line {line_num}: ...{line.strip()[:80]}...")
                    break
    
    return 0 if not errors and not specific_issues else 1

if __name__ == '__main__':
    sys.exit(main())
