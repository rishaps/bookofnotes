#!/usr/bin/env python3
"""
Script to fix LaTeX equation numbers that appear after $$ which causes KaTeX parsing errors.
Converts patterns like:
  $$ equation $$ (2.1)
to:
  $$ equation \\tag{2.1} $$
"""

import re

def fix_equation_numbers(content):
    """
    Fix equation numbers that appear after closing $$ by moving them inside using \\tag{}.
    """
    # Pattern to match: $$ ... $$ (X.Y) where X.Y is an equation number
    # We need to move the equation number inside the $$ using \tag{}
    
    # Match $$ followed by content, then $$ and then a space and parenthesized number
    pattern = r'\$\$\s*(.+?)\s*\$\$\s*\((\d+\.\d+(?:\.\d+)?[a-z]?)\)'
    
    def replace_func(match):
        equation_content = match.group(1).strip()
        equation_number = match.group(2)
        # Add \tag{number} before the closing $$
        return f'$$ {equation_content} \\\\tag{{{equation_number}}} $$'
    
    fixed_content = re.sub(pattern, replace_func, content, flags=re.DOTALL)
    
    # Count changes
    original_count = len(re.findall(pattern, content, flags=re.DOTALL))
    
    return fixed_content, original_count

def main():
    input_file = 'data/courseContent-fisica.ts'
    
    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("Fixing equation numbers...")
    fixed_content, count = fix_equation_numbers(content)
    
    print(f"Writing fixed content back to {input_file}...")
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"Done! Fixed {count} equation numbers.")

if __name__ == '__main__':
    main()
