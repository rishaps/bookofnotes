#!/usr/bin/env python3
"""
Script to add MORE spacing before equation tags (5-6cm gap).
"""

import re

def add_more_spacing(content):
    """
    Replace existing \qquad \tag with \hspace{4cm} \tag for much larger spacing.
    """
    # Replace \qquad \tag with \hspace{4cm} \tag
    pattern = r'\\\\qquad \\\\tag\{([^}]+)\}'
    
    def replace_func(match):
        equation_number = match.group(1)
        # Use \hspace{4cm} for approximately 5-6cm visual spacing
        return f'\\\\hspace{{4cm}} \\\\tag{{{equation_number}}}'
    
    fixed_content = re.sub(pattern, replace_func, content)
    count = len(re.findall(pattern, content))
    
    return fixed_content, count

def main():
    input_file = 'data/courseContent-fisica.ts'
    
    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("Adding more spacing (4cm) before equation tags...")
    fixed_content, count = add_more_spacing(content)
    
    print(f"Writing fixed content back to {input_file}...")
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"Done! Updated spacing for {count} equation tags.")

if __name__ == '__main__':
    main()
