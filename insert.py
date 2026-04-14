with open("c:/Users/bange/Desktop/Blue/index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '<div class="dark-base">' in line:
        start_idx = i
        break

for i, line in enumerate(lines):
    if '</div> <!-- End dark-base -->' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    with open("c:/Users/bange/Desktop/Blue/new_sections.html", "r", encoding="utf-8") as f:
        new_content = f.read()
    
    with open("c:/Users/bange/Desktop/Blue/index.html", "w", encoding="utf-8") as f:
        f.writelines(lines[:start_idx])
        f.write(new_content)
        f.writelines(lines[end_idx+1:])
    print("Replaced successfully!")
else:
    print(f"Failed. start_idx: {start_idx}, end_idx: {end_idx}")
