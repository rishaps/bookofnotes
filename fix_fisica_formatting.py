#!/usr/bin/env python3
"""
Script to fix Fisica content formatting to match the other course files.
- Converts *italics* to **bold** for important terms
- Ensures consistent formatting with Geometria and Analisi1 styles
"""

import re

def fix_formatting(content):
    """
    Convert single asterisk italics *text* to double asterisk bold **text**
    but be careful not to affect LaTeX or **bold** that already exists.
    """
    # Pattern to match single asterisk italics that are NOT inside LaTeX or already bold
    # This matches *text* but not:
    # - **text** (already bold)
    # - $...*...$ (inside LaTeX)
    # - **...*...** (single asterisk inside bold)
    
    lines = content.split('\n')
    fixed_lines = []
    
    for line in lines:
        # Skip if line is purely LaTeX (starts and ends with $$)
        if line.strip().startswith('$$') and line.strip().endswith('$$'):
            fixed_lines.append(line)
            continue
        
        # Skip if line is inside a display math block (just $$ on its own)
        if line.strip() == '$$':
            fixed_lines.append(line)
            continue
            
        # Process the line to convert *italics* to **bold**
        # We need to be careful about:
        # 1. Not touching content inside $...$ (inline LaTeX)
        # 2. Not touching ** which already marks bold
        # 3. Not touching LaTeX commands like \mathbf{...}
        
        # First, protect LaTeX content by replacing it temporarily
        latex_placeholders = []
        
        # Protect inline LaTeX $...$
        def protect_latex(match):
            latex_placeholders.append(match.group(0))
            return f"__LATEX_PLACEHOLDER_{len(latex_placeholders) - 1}__"
        
        # Protect inline math
        protected_line = re.sub(r'\$[^$]+\$', protect_latex, line)
        
        # Now convert *text* to **text** (single asterisk italics to bold)
        # Match *word* but not **word** and not ***
        # Pattern: Match single * not preceded or followed by another *
        def convert_italics_to_bold(match):
            text = match.group(1)
            return f'**{text}**'
        
        # Match *text* where text doesn't contain * and the surrounding chars aren't *
        # This regex matches: (?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)
        protected_line = re.sub(r'(?<!\*)\*([^*]+?)\*(?!\*)', convert_italics_to_bold, protected_line)
        
        # Restore LaTeX placeholders
        for i, latex in enumerate(latex_placeholders):
            protected_line = protected_line.replace(f"__LATEX_PLACEHOLDER_{i}__", latex)
        
        fixed_lines.append(protected_line)
    
    return '\n'.join(fixed_lines)

def main():
    input_file = 'data/courseContent-fisica.ts'
    
    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("Converting *italics* to **bold**...")
    fixed_content = fix_formatting(content)
    
    # Count changes
    original_single = len(re.findall(r'(?<!\*)\*[^*]+\*(?!\*)', content))
    
    print(f"Writing fixed content back to {input_file}...")
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"Done! Converted approximately {original_single} italic markers to bold.")

if __name__ == '__main__':
    main()
