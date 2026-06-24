import re
import os
import glob

# Find all courseContent files
files = glob.glob("/home/zonar/projects/bookofnotes/data/courseContent-*.ts")

def process_file(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()

    new_lines = []
    chapter_num = 0
    subsection_num = 0
    is_inside_subsections_array = False
    
    for line in lines:
        content = line.strip()
        
        # Track if we are inside a subsections array
        if 'subsections: [' in line:
            is_inside_subsections_array = True
        elif '],' in line and is_inside_subsections_array:
            # Check if this closing bracket is at the same level as subsections: [
            # In most files, 'subsections: [' is at indent N, and its closing '],' is at indent N.
            # But let's simplify: once we hit a MainSection identifier (like id:), 
            # we are definitely out of previous subsections.
            pass

        if 'id: "' in line or "id: '" in line:
            # We found a new main section ID, so we are not in subsections anymore
            # unless the id is inside a subsection (unlikely in this schema)
            # Schema: { id: "...", title: "...", subsections: [ { title: "...", content: [...] } ] }
            # So 'id:' only appears in MainSection.
            indent = len(line) - len(line.lstrip())
            # In our files, MainSection ID indent is small (4 or 8)
            # Subsection items don't have IDs.
            is_inside_subsections_array = False

        # Replace global arrows
        line = line.replace('\u2192', '-->')

        if content.startswith('title: "') or content.startswith("title: '"):
            indent = len(line) - len(line.lstrip())
            title_text = content[8:-2] # Extract text inside quotes
            
            # Clean prefixes
            clean_text = title_text
            for _ in range(4):
                clean_text = re.sub(r'^(Lezione|Capitolo|Lesson)\s+\d+(\.\d+)?\s*(:|-->|->|\u2192|‐‐>|–>|—>)?\s*', '', clean_text, flags=re.IGNORECASE)
                clean_text = re.sub(r'^(:|-->|->|\u2192|‐‐>|–>|—>)\s*', '', clean_text)
                clean_text = re.sub(r'^\d+(\.\d+)?\s+', '', clean_text)
                clean_text = clean_text.strip()
            
            if not is_inside_subsections_array: # Main Section
                chapter_num += 1
                subsection_num = 0
                new_title = clean_text
                new_line = f'{line[:indent]}title: "{new_title}",\n'
                new_lines.append(new_line)
            else: # Subsection
                subsection_num += 1
                new_title = clean_text
                new_line = f'{line[:indent]}title: "{new_title}",\n'
                new_lines.append(new_line)
        else:
            new_lines.append(line)

    with open(filepath, 'w') as f:
        f.writelines(new_lines)
    print(f"Processed {filepath}")

for fp in files:
    process_file(fp)
