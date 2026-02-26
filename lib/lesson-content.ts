export type CodeBlock = {
  lang: string;
  code: string;
  label?: string;
  output?: string;       // shown in green output box below code
};

export type Section = {
  heading: string;
  body: string[];        // array of paragraphs \u2014 much richer theory
  code?: CodeBlock;
  examples?: CodeBlock[]; // extra examples with their own output
  tip?: string;
  warning?: string;
  note?: string;
};

export type QuizQ =
  | { type: "mcq";        q: string; options: string[]; answer: number; explanation: string }
  | { type: "truefalse";  q: string; answer: boolean;   explanation: string }
  | { type: "fillblank";  q: string; answer: string;    hint: string }
  | { type: "predict";    q: string; code: string;      answer: string; explanation: string };

export type LessonContent = {
  id: string;
  title: string;
  duration: string;
  free?: boolean;
  intro: string;
  sections: Section[];
  quiz: QuizQ[];
};

const content: Record<string, LessonContent> = {

  // \u2500\u2500\u2500 LESSON 1 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l1: {
    id: "l1", title: "Welcome to the Course", duration: "5m", free: true,
    intro: "Welcome to Python Fundamentals. By the end of this course you will have gone from writing your very first line of Python to building a real, working command-line application. No prior experience needed \u2014 just curiosity and a willingness to type code.",
    sections: [
      {
        heading: "What is Python and why does it matter?",
        body: [
          "Python is a high-level, general-purpose programming language first created by Guido van Rossum in 1991. The name comes from Monty Python, not the snake \u2014 though the snake has become its unofficial mascot.",
          "Today Python is consistently ranked the world's most popular programming language. It powers Instagram's backend (1 billion+ users), Netflix's recommendation engine, NASA's scientific research, machine learning models at Google and OpenAI, and automation scripts at virtually every major company on earth.",
          "The reason Python spread so far, so fast, is its philosophy: code should read almost like English. Compare printing text in different languages:",
        ],
        code: {
          lang: "python",
          label: "Python vs other languages",
          code:
`# Python \u2014 almost reads like a sentence
print("Hello, World!")

# Java equivalent \u2014 much more ceremony
# public class Main {
#     public static void main(String[] args) {
#         System.out.println("Hello, World!");
#     }
# }

# C++ equivalent \u2014 even more
# #include <iostream>
# int main() {
#     std::cout << "Hello, World!" << std::endl;
#     return 0;
# }`,
          output: "Hello, World!",
        },
        tip: "Python's philosophy is captured in 'The Zen of Python' (type import this in Python to read it). The most important line: 'Readability counts.'",
      },
      {
        heading: "What will we build together?",
        body: [
          "This course is not a list of syntax rules. Every concept connects to a real project. By the final module you will have built a fully functional command-line Todo application \u2014 one that stores tasks in a file, supports adding, completing, and deleting tasks, shows colored output in the terminal, and has a proper CLI interface.",
          "More importantly, you will understand exactly how every line of that project works, because we built it piece by piece from the ground up.",
          "Here is a preview of the final project running in a terminal:",
        ],
        code: {
          lang: "bash",
          label: "Final project preview",
          code:
`$ python todo.py add "Learn Python basics"
  Added: Learn Python basics

$ python todo.py add "Build the CLI project"
  Added: Build the CLI project

$ python todo.py list
  Todo List
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  [ ] 1. Learn Python basics
  [ ] 2. Build the CLI project

$ python todo.py done 1
  Completed: Learn Python basics

$ python todo.py list
  Todo List
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  [x] 1. Learn Python basics
  [ ] 2. Build the CLI project`,
          output: "A real working app you will build from scratch.",
        },
      },
      {
        heading: "How to get the most from this course",
        body: [
          "The single most important thing you can do: type every code example yourself. Do not copy-paste. The physical act of typing forces your brain to process each character, and the small mistakes you make and fix are some of the best learning moments.",
          "Each lesson follows the same structure: explanation of the concept (the 'why'), worked code examples (the 'what'), edge cases and gotchas (the 'watch out'), and a quiz to lock in the knowledge.",
          "When something does not work, that is not failure \u2014 that is debugging, and debugging is one of the most important skills in programming. Read the error message carefully. Python's error messages are actually very descriptive.",
        ],
        tip: "Set up VS Code with the Python extension open alongside this course. Every time you see a code block, stop reading and type it out yourself before moving on.",
      },
    ],
    quiz: [
      { type: "mcq", q: "Who created Python?", options: ["Dennis Ritchie", "Guido van Rossum", "James Gosling", "Bjarne Stroustrup"], answer: 1, explanation: "Guido van Rossum created Python in 1991. He named it after Monty Python, not the snake." },
      { type: "truefalse", q: "Python was released in 1991.", answer: true, explanation: "Python was created by Guido van Rossum and first released in 1991." },
      { type: "mcq", q: "What is the best way to learn from code examples in this course?", options: ["Read them quickly", "Copy and paste them", "Type them yourself", "Skip them and read the text"], answer: 2, explanation: "Typing code yourself forces your brain to process each line. Copy-pasting skips the learning." },
    ],
  },

  // \u2500\u2500\u2500 LESSON 2 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l2: {
    id: "l2", title: "Installing Python and VS Code", duration: "8m", free: true,
    intro: "Before writing any code we need two things: Python itself, and a good code editor. We will use Visual Studio Code which is free, fast, cross-platform, and has the best Python support of any editor.",
    sections: [
      {
        heading: "Installing Python",
        body: [
          "Go to python.org/downloads and click the big yellow Download button. It will automatically detect your operating system. Always download Python 3 \u2014 Python 2 reached end-of-life in 2020 and should not be used for new projects.",
          "On Windows: run the installer. On the FIRST screen, before clicking Install, check the box that says 'Add Python to PATH'. This is critical \u2014 without it Python will not be accessible from the command line. Then click 'Install Now'.",
          "On Mac: the installer works the same way. Alternatively, if you use Homebrew (a Mac package manager), you can run brew install python3. On Linux: Python is often pre-installed. If not, run sudo apt install python3 (Ubuntu/Debian) or sudo dnf install python3 (Fedora).",
        ],
        code: {
          lang: "bash",
          label: "Verify installation in terminal",
          code:
`# Open Terminal (Mac/Linux) or Command Prompt (Windows)
# and run these commands:

python --version
# If that does not work, try:
python3 --version

pip --version
# pip is Python's package manager \u2014 it comes with Python`,
          output:
`Python 3.12.3
pip 24.0 from /usr/lib/python3/dist-packages/pip (python 3.12)`,
        },
        warning: "On Windows, if you see 'python is not recognized as an internal or external command', you forgot to check 'Add Python to PATH' during installation. Uninstall Python and reinstall, making sure to check that box.",
      },
      {
        heading: "Installing VS Code and the Python extension",
        body: [
          "Download VS Code from code.visualstudio.com. It is free and available for Windows, Mac, and Linux. After installing, open it.",
          "Press Ctrl+Shift+X (or Cmd+Shift+X on Mac) to open the Extensions panel. Search for 'Python' and install the extension published by Microsoft \u2014 it has a blue verified checkmark. This gives you syntax highlighting, autocompletion, inline error detection, and an integrated debugger.",
          "Also install 'Pylance' by Microsoft \u2014 it adds much smarter type-checking and autocompletion. And optionally 'indent-rainbow' which colour-codes your indentation levels, which is very helpful in Python where indentation is meaningful.",
        ],
        tip: "After installing the Python extension, open VS Code's Command Palette (Ctrl+Shift+P) and type 'Python: Select Interpreter'. Choose the Python version you just installed. This tells VS Code which Python to use.",
      },
      {
        heading: "Your first Python file \u2014 running it two ways",
        body: [
          "Create a new file called hello.py (the .py extension tells VS Code and your OS that this is a Python file). Type the code below. Then we will run it two different ways.",
          "Way 1: Press F5 in VS Code \u2014 this runs the file through VS Code's debugger. You will see output at the bottom in the Terminal panel.",
          "Way 2: Open a terminal, navigate to the folder containing hello.py using cd, and type python hello.py. This is how you will run Python programs in the real world.",
        ],
        code: {
          lang: "python",
          label: "hello.py",
          code:
`# My first Python program
print("Hello, World!")
print("My name is Alice")
print("I am learning Python!")

# You can print numbers too
print(42)
print(3.14)

# And you can do math inside print
print(10 + 5)
print(100 / 4)`,
          output:
`Hello, World!
My name is Alice
I am learning Python!
42
3.14
15
25.0`,
        },
        examples: [
          {
            lang: "bash",
            label: "Running from terminal",
            code:
`# Navigate to your file's folder
cd Desktop

# Run the file
python hello.py`,
            output:
`Hello, World!
My name is Alice
I am learning Python!`,
          },
        ],
      },
    ],
    quiz: [
      { type: "mcq", q: "What critical option must you check when installing Python on Windows?", options: ["Install for all users", "Add Python to PATH", "Install pip", "Customize installation"], answer: 1, explanation: "Without 'Add Python to PATH', you cannot run python from the command line. It is the most common installation mistake on Windows." },
      { type: "truefalse", q: "Python 2 is still actively maintained and suitable for new projects.", answer: false, explanation: "Python 2 reached end-of-life on January 1, 2020. Always use Python 3 for new projects." },
      { type: "fillblank", q: "Python files use the ._______ file extension.", answer: "py", hint: "The extension is an abbreviation of the language name" },
      { type: "predict", q: "What does this print?", code: `print(10 + 5)\nprint(10 * 2)\nprint(10 / 4)`, answer: "15\n20\n2.5", explanation: "10+5=15, 10*2=20, 10/4=2.5 (division always returns float in Python 3)" },
    ],
  },

  // \u2500\u2500\u2500 LESSON 3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l3: {
    id: "l3", title: "Your First Python Script", duration: "7m", free: true,
    intro: "Now that Python is installed, let us explore the fundamental building blocks: print(), input(), and comments. These three alone can build simple interactive programs.",
    sections: [
      {
        heading: "The print() function \u2014 more than you think",
        body: [
          "print() is a built-in function that outputs text (and other values) to the terminal. You have already seen it, but it has several features worth knowing from the start.",
          "By default, print() adds a newline character (\\n) at the end of every call \u2014 that is why each print() appears on its own line. You can change this with the end parameter. You can also print multiple values separated by a separator using the sep parameter.",
          "Understanding these details now will save you confusion later when you want to print things on the same line or format output precisely.",
        ],
        code: {
          lang: "python",
          label: "print() in depth",
          code:
`# Basic print
print("Hello!")

# Print multiple values \u2014 space-separated by default
print("My name is", "Alice", "and I am", 25, "years old")

# Change the separator
print("2024", "01", "15", sep="-")   # date format
print("a", "b", "c", sep=", ")       # comma-separated

# Change the end character (default is newline)
print("Loading", end="")
print("...", end="")
print(" Done!")

# Print a blank line
print()

# Print special characters
print("Line 1\nLine 2\nLine 3")   # \n = newline
print("Column1\tColumn2\tColumn3") # \t = tab`,
          output:
`Hello!
My name is Alice and I am 25 years old
2024-01-15
a, b, c
Loading... Done!

Line 1
Line 2
Line 3
Column1	Column2	Column3`,
        },
      },
      {
        heading: "input() \u2014 making your program interactive",
        body: [
          "input() pauses your program and waits for the user to type something and press Enter. Whatever they type is returned as a string \u2014 always a string, regardless of what the user typed. This is a critical detail we will return to in the Type Conversion lesson.",
          "The string you pass to input() is displayed as a prompt \u2014 a message telling the user what to type. It is good practice to include a space before the closing quote so the user's typing does not run right up against your prompt text.",
          "A common beginner program combines print() and input() to create a simple conversation:",
        ],
        code: {
          lang: "python",
          label: "interactive greeting",
          code:
`# Ask for the user's name
name = input("What is your name? ")

# Ask for their age
age = input("How old are you? ")

# Use what they told us
print("Hello,", name + "!")
print("Wow, you are", age, "years old!")
print("In 10 years you will be", age, "... wait, that is wrong.")
print("We cannot do math on age yet because input() gives us a STRING.")`,
          output:
`What is your name? Alice
How old are you? 25
Hello, Alice!
Wow, you are 25 years old!
In 10 years you will be 25 ... wait, that is wrong.
We cannot do math on age yet because input() gives us a STRING.`,
        },
        warning: "input() ALWAYS returns a string. If the user types 25, you get the string '25', not the number 25. You cannot do math on it yet. We fix this in the Type Conversion lesson using int().",
      },
      {
        heading: "Comments \u2014 writing code for humans",
        body: [
          "A comment is a note in your code that Python completely ignores. Use the # symbol to start a comment \u2014 everything from # to the end of the line is ignored by the interpreter.",
          "Comments serve two purposes: explaining your code to other people (or future-you), and temporarily disabling lines of code while debugging.",
          "The most important rule about comments: explain WHY, not WHAT. The code already shows what is happening. Comments should explain your intent, your reasoning, and any non-obvious decisions.",
        ],
        code: {
          lang: "python",
          label: "good vs bad comments",
          code:
`# BAD COMMENT \u2014 just repeats what the code says
x = x + 1  # add 1 to x

# GOOD COMMENT \u2014 explains WHY
x = x + 1  # offset by 1 because API uses 1-based indexing

# BAD COMMENT \u2014 obvious
print("Hello")  # print hello

# GOOD COMMENT \u2014 explains a non-obvious decision
# We use sys.stdout.write instead of print to avoid the
# automatic newline that print() adds
import sys
sys.stdout.write("Hello")

# Temporarily disable code while debugging
result = calculate_total(items)
# result = calculate_total_with_tax(items)  # enable after tax logic is fixed
print(result)

# Multi-line comments: Python has no block comment syntax
# Just use multiple # lines
# This function handles the edge case where the
# input list is empty \u2014 returning 0 instead of crashing`,
        },
        examples: [
          {
            lang: "python",
            label: "A well-commented program",
            code:
`# Simple temperature converter
# Formula: Celsius = (Fahrenheit - 32) * 5/9

temp_f = float(input("Enter temperature in Fahrenheit: "))

# Convert using standard formula
temp_c = (temp_f - 32) * 5 / 9

# Round to 1 decimal place for readability
print(f"{temp_f}F is {round(temp_c, 1)}C")`,
            output:
`Enter temperature in Fahrenheit: 98.6
98.6F is 37.0C`,
          },
        ],
        tip: "Write comments as if the person reading your code is a tired developer at midnight who will hunt you down if your code is confusing. Be kind. Be clear.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does input() always return?", options: ["int", "float", "str", "whatever type the user enters"], answer: 2, explanation: "input() ALWAYS returns a string (str), regardless of what the user types. You must manually convert it to int or float if you need a number." },
      { type: "predict", q: "What is the output?", code: `print("a", "b", "c", sep="-")`, answer: "a-b-c", explanation: "The sep parameter replaces the default space separator between values." },
      { type: "truefalse", q: "Python executes comment lines as code.", answer: false, explanation: "Comments starting with # are completely ignored by the Python interpreter. They exist only for human readers." },
      { type: "fillblank", q: "To print without a newline at the end, use: print('text', end=___)", answer: '""', hint: "An empty string means no end character" },
      { type: "predict", q: "What prints?", code: `print("Hello", end=" ")\nprint("World")`, answer: "Hello World", explanation: "end=' ' replaces the newline with a space, so the second print continues on the same line." },
    ],
  },

  // \u2500\u2500\u2500 LESSON 4 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l4: {
    id: "l4", title: "How Python Works Internally", duration: "9m", free: true,
    intro: "You do not need to understand Python's internals to use it. But knowing what happens when you run a .py file will make you a much better debugger and help you understand error messages.",
    sections: [
      {
        heading: "What happens when you run python hello.py",
        body: [
          "When you type python hello.py in a terminal, several things happen in sequence. Understanding this sequence helps you understand where errors come from.",
          "Step 1 \u2014 Lexing: Python reads your file character by character and groups them into 'tokens' (keywords, strings, numbers, operators). If you have a typo like prnit instead of print, the lexer may still accept it \u2014 it looks like a valid name.",
          "Step 2 \u2014 Parsing: Python checks that the tokens follow valid Python grammar. This is where SyntaxError comes from. If you forget a colon after an if statement, the parser catches it here, before any code runs.",
          "Step 3 \u2014 Compilation to bytecode: Python compiles your source code to bytecode \u2014 a lower-level set of instructions stored in .pyc files inside a __pycache__ folder. You will see this folder appear after running Python files.",
          "Step 4 \u2014 Execution: The Python Virtual Machine (PVM) executes the bytecode instructions one by one, top to bottom.",
        ],
        code: {
          lang: "python",
          label: "Where different errors are caught",
          code:
`# SyntaxError \u2014 caught at PARSE time, before any code runs
# if True    # missing colon \u2014 Python catches this immediately

# NameError \u2014 caught at RUNTIME when Python tries to execute this line
# print(undefined_variable)

# These lines run fine (before the error):
print("Line 1 runs")
print("Line 2 runs")
# print(undefined_variable)  # this would crash HERE at runtime
print("Line 4 would NOT run if line 3 crashed")`,
          output:
`Line 1 runs
Line 2 runs
Line 4 would NOT run if line 3 crashed`,
        },
        tip: "When you get a SyntaxError, Python tells you the line number but sometimes the REAL mistake is on the line before (e.g., a missing closing parenthesis on the previous line).",
      },
      {
        heading: "Indentation \u2014 Python's defining feature",
        body: [
          "Most programming languages use curly braces {} to group code into blocks. Python uses indentation \u2014 the whitespace at the beginning of a line. This is not just a style preference \u2014 it is mandatory syntax.",
          "The standard in Python is 4 spaces per indentation level. VS Code automatically inserts 4 spaces when you press Tab (as long as you have the Python extension installed). Never mix tabs and spaces \u2014 Python 3 raises a TabError if you do.",
          "Think of indentation like nested boxes. Code at the same indentation level is in the same 'box'. When you increase indentation, you open a new inner box. When you decrease it, you return to the outer box.",
          "This becomes most important with if statements, loops, and functions \u2014 all of which we cover in upcoming lessons. For now, understand that Python uses whitespace structurally, not decoratively.",
        ],
        code: {
          lang: "python",
          label: "Indentation creates structure",
          code:
`# This is at the TOP LEVEL (no indentation)
print("I am at the top level")

if True:
    # This is INSIDE the if block (4 spaces)
    print("I am inside the if block")
    print("I am also inside the if block")

    if True:
        # This is NESTED further (8 spaces)
        print("I am nested inside a nested block")

# Back to top level
print("I am at the top level again")`,
          output:
`I am at the top level
I am inside the if block
I am also inside the if block
I am nested inside a nested block
I am at the top level again`,
        },
        warning: "Never mix tabs and spaces for indentation. Python 3 raises a TabError if you do. Configure VS Code to insert spaces when you press Tab: it does this by default with the Python extension.",
      },
      {
        heading: "Python executes top to bottom \u2014 with one big exception",
        body: [
          "Python reads and executes your file from top to bottom, one statement at a time. If it hits an error on line 5, lines 1-4 will already have executed. This is important for debugging \u2014 your program does not 'start over' when it crashes.",
          "The one exception: function and class definitions. When Python encounters a def or class, it does NOT run the code inside \u2014 it just records that the function/class exists. The code inside only runs when you explicitly call the function.",
          "This is why you can define a function at the top of a file and call it at the bottom \u2014 Python reads the whole file before running anything... wait, actually that is not quite right. Python executes top to bottom, but def just creates a function object without running it. Let us see this clearly:",
        ],
        code: {
          lang: "python",
          label: "def vs calling a function",
          code:
`print("Step 1: about to define greet")

def greet(name):
    # This block does NOT run right now
    # It only runs when greet() is called
    print(f"Hello, {name}!")

print("Step 2: greet is defined but not called yet")

greet("Alice")   # NOW the code inside runs

print("Step 3: greet was called, back to top level")

greet("Bob")     # runs again`,
          output:
`Step 1: about to define greet
Step 2: greet is defined but not called yet
Hello, Alice!
Step 3: greet was called, back to top level
Hello, Bob!`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What type of error does Python catch before running any code?", options: ["NameError", "TypeError", "SyntaxError", "ValueError"], answer: 2, explanation: "SyntaxError is caught during parsing, before execution begins. NameError, TypeError, and ValueError are runtime errors caught during execution." },
      { type: "truefalse", q: "Python uses curly braces {} to define code blocks.", answer: false, explanation: "Python uses indentation (whitespace) to define code blocks, not curly braces. This is unique to Python among mainstream languages." },
      { type: "predict", q: "What prints?", code: `print("A")\nif True:\n    print("B")\nprint("C")`, answer: "A\nB\nC", explanation: "All three print. The if condition is True so the indented block runs." },
      { type: "fillblank", q: "Python's standard indentation is ___ spaces per level.", answer: "4", hint: "This is the universally agreed Python style standard (PEP 8)" },
      { type: "mcq", q: "When does the code INSIDE a function definition run?", options: ["When Python reads the def statement", "When the function is called", "At the start of the program", "Never"], answer: 1, explanation: "The def statement creates the function but does not run its body. The body only runs when you explicitly call the function by name with parentheses." },
    ],
  },

  // \u2500\u2500\u2500 LESSON 5 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l5: {
    id: "l5", title: "Variables and Assignment", duration: "11m",
    intro: "Variables are named containers that hold data. In Python, creating a variable is as simple as writing a name, an equals sign, and a value. No type declarations, no keywords \u2014 just assign and go.",
    sections: [
      {
        heading: "What is a variable and how does Python store it?",
        body: [
          "When you write x = 10, Python does three things. First, it creates an integer object with value 10 in memory. Second, it creates a label called 'x'. Third, it points that label at the object.",
          "This is important: variables in Python are not boxes that contain values \u2014 they are labels (references) that point to objects. This distinction matters when we get to lists and mutability, but for now just know that assignment creates a pointer.",
          "Unlike languages like C++ or Java, Python is dynamically typed \u2014 you do not declare what type a variable is. Python figures it out from the value you assign. And you can reassign a variable to a completely different type at any time (though this is usually bad practice).",
        ],
        code: {
          lang: "python",
          label: "variable assignment",
          code:
`# Creating variables \u2014 just assign a value
name     = "Alice"          # string
age      = 25               # integer
height   = 5.7              # float
is_happy = True             # boolean
nothing  = None             # None (represents absence of value)

# Print them
print(name)       
print(age)        
print(height)     
print(is_happy)   
print(nothing)    

# Check what type a variable is
print(type(name))      
print(type(age))       
print(type(is_happy))  
print(type(nothing))   `,
          output:
`Alice
25
5.7
True
None
<class 'str'>
<class 'int'>
<class 'bool'>
<class 'NoneType'>`,
        },
      },
      {
        heading: "Naming rules and conventions",
        body: [
          "Python has strict rules about variable names: they must start with a letter or underscore, can contain letters, numbers, and underscores, and cannot be Python reserved keywords (like if, for, while, class, return).",
          "Beyond the rules, Python has strong conventions (from PEP 8, the official style guide): use snake_case for variable and function names (words separated by underscores, all lowercase). Use UPPER_SNAKE_CASE for constants. Use CamelCase for class names.",
          "Good naming is one of the most important programming skills. A variable named first_name tells you everything. A variable named fn or x1 tells you nothing. Code is read far more often than it is written \u2014 name things for the reader.",
        ],
        code: {
          lang: "python",
          label: "naming rules and conventions",
          code:
`# VALID names
first_name    = "Alice"    # snake_case \u2014 recommended
_private      = 42         # leading underscore \u2014 convention for private
MAX_SIZE      = 100        # UPPER_CASE \u2014 convention for constants
myVariable    = "bad"      # camelCase \u2014 valid but not Pythonic

# INVALID names \u2014 these cause SyntaxError
# 2fast = True             # cannot start with a number
# my-var = 5               # hyphens not allowed (it looks like minus)
# class = "Python"         # 'class' is a reserved keyword
# for = 10                 # 'for' is a reserved keyword

# Reserved keywords you cannot use as names:
# False, None, True, and, as, assert, async, await, break,
# class, continue, def, del, elif, else, except, finally,
# for, from, global, if, import, in, is, lambda, nonlocal,
# not, or, pass, raise, return, try, while, with, yield`,
        },
        tip: "If you want to use a keyword as a name, add a trailing underscore: class_ = 'Python' or type_ = 'int'. This is an official Python convention.",
      },
      {
        heading: "Multiple assignment and swapping",
        body: [
          "Python supports several shorthand forms of assignment that you will see frequently in real code.",
          "Multiple assignment on one line: x, y, z = 1, 2, 3. This is called tuple unpacking and we cover it in depth in the Data Structures module. For now, know that the number of variables on the left must match the number of values on the right.",
          "The swap trick: a, b = b, a. In most languages, swapping two variables requires a temporary variable. In Python, the right side is fully evaluated before any assignment happens, so you can swap in one line. This is considered idiomatic Python.",
          "Augmented assignment operators: x += 1 is shorthand for x = x + 1. Python supports +=, -=, *=, /=, //=, %=, **=.",
        ],
        code: {
          lang: "python",
          label: "multiple assignment and shortcuts",
          code:
`# Multiple assignment in one line
x, y, z = 1, 2, 3
print(x, y, z)

# Assign same value to multiple variables
a = b = c = 0
print(a, b, c)

# Swap without a temp variable
p, q = 10, 20
print(f"Before: p={p}, q={q}")
p, q = q, p
print(f"After:  p={p}, q={q}")

# Augmented assignment
score = 100
score += 10    # score = score + 10
print(score)
score *= 2     # score = score * 2
print(score)
score -= 50
print(score)`,
          output:
`1 2 3
0 0 0
Before: p=10, q=20
After:  p=20, q=10
110
220
170`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "Which variable name follows Python conventions?", options: ["myVariable", "MyVariable", "my_variable", "MYVARIABLE"], answer: 2, explanation: "Python convention (PEP 8) uses snake_case for variable names: all lowercase with words separated by underscores." },
      { type: "truefalse", q: "In Python, you must declare a variable's type before assigning a value.", answer: false, explanation: "Python is dynamically typed. You simply assign a value and Python infers the type automatically." },
      { type: "predict", q: "What prints?", code: `a, b = 5, 10\na, b = b, a\nprint(a, b)`, answer: "10 5", explanation: "a,b = b,a swaps the values. a gets b's value (10) and b gets a's value (5)." },
      { type: "fillblank", q: "x += 5 is shorthand for x = x ___ 5", answer: "+", hint: "Augmented assignment adds the right side to the variable" },
      { type: "mcq", q: "What does type(42) return?", options: ["'integer'", "<class 'int'>", "int", "number"], answer: 1, explanation: "type() returns the type object, which displays as <class 'int'> for integers." },
    ],
  },

  // \u2500\u2500\u2500 LESSON 6 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l6: {
    id: "l6", title: "Strings: Creation and Methods", duration: "14m",
    intro: "Strings are sequences of characters and one of the most used data types in any program. Python's string handling is exceptionally powerful \u2014 strings come with 40+ built-in methods covering everything from searching to formatting to encoding.",
    sections: [
      {
        heading: "Creating strings \u2014 four ways",
        body: [
          "Python strings can be written with single quotes, double quotes, or triple quotes (either single or double). They are all equivalent \u2014 choose whichever avoids escaping in your specific case.",
          "Triple-quoted strings (''' or \"\"\") can span multiple lines without any special characters. They are commonly used for long strings, multi-line messages, and docstrings (documentation for functions and classes).",
          "Strings are immutable in Python \u2014 once created, they cannot be changed. Operations that appear to modify a string actually create a NEW string. This is why string methods return new strings rather than modifying in place.",
        ],
        code: {
          lang: "python",
          label: "string creation",
          code:
`# Single and double quotes are identical
s1 = 'Hello, World!'
s2 = "Hello, World!"
print(s1 == s2)   # True \u2014 they are the same

# Use double quotes when the string contains a single quote
sentence = "It's a beautiful day"
# Alternative: escape with backslash
sentence = 'It\'s a beautiful day'

# Triple quotes for multi-line strings
poem = '''Roses are red,
Violets are blue,
Python is awesome,
And so are you.'''
print(poem)

# Check string length
print(len("Hello"))     # 5
print(len(""))          # 0 \u2014 empty string`,
          output:
`True
Roses are red,
Violets are blue,
Python is awesome,
And so are you.
5
0`,
        },
      },
      {
        heading: "f-strings \u2014 the modern way to embed values",
        body: [
          "f-strings (formatted string literals) were introduced in Python 3.6 and are now the standard way to embed values inside strings. Prefix the string with f (or F) and put any expression inside curly braces {}.",
          "f-strings are not just for variables \u2014 you can put any valid Python expression inside the braces: arithmetic, function calls, method calls, conditional expressions, even formatting directives.",
          "The alternative approaches \u2014 % formatting and str.format() \u2014 still appear in older code and libraries. Knowing f-strings is sufficient for new code, but recognise the older syntax when you see it.",
        ],
        code: {
          lang: "python",
          label: "f-strings in depth",
          code:
`name    = "Alice"
age     = 25
score   = 95.678
pi      = 3.14159265

# Basic embedding
print(f"Hello, {name}!")
print(f"You are {age} years old")

# Expressions inside braces
print(f"Next year you will be {age + 1}")
print(f"Name has {len(name)} characters")
print(f"Uppercase: {name.upper()}")

# Formatting numbers
print(f"Score: {score:.2f}")          # 2 decimal places
print(f"Pi: {pi:.4f}")               # 4 decimal places
print(f"Big number: {1000000:,}")     # thousands separator
print(f"Percentage: {0.857:.1%}")     # as percentage

# Debugging shortcut (Python 3.8+): variable=
x = 42
print(f"{x=}")   # prints: x=42`,
          output:
`Hello, Alice!
You are 25 years old
Next year you will be 26
Name has 5 characters
Uppercase: ALICE
Score: 95.68
Pi: 3.1416
Big number: 1,000,000
Percentage: 85.7%
x=42`,
        },
        tip: "The {variable=} syntax (with equals sign) is a Python 3.8+ debugging trick. It prints both the variable name and its value, great for quick debugging without writing print(f'x = {x}').",
      },
      {
        heading: "Essential string methods \u2014 the 15 you will use constantly",
        body: [
          "Strings have methods you call with dot notation: string.method(). Remember: string methods always return a NEW string \u2014 they never modify the original. Strings are immutable.",
          "The most important group is case methods: upper(), lower(), title(), capitalize(). Then whitespace methods: strip(), lstrip(), rstrip(). Then search methods: find(), index(), startswith(), endswith(), count(). Then transformation: replace(), split(), join().",
          "A critical mistake beginners make: calling a method but not using the returned value. s.upper() does nothing useful on its own \u2014 you must do s = s.upper() or print(s.upper()) to use the result.",
        ],
        code: {
          lang: "python",
          label: "essential string methods",
          code:
`s = "  Hello, World!  "

# Whitespace removal
print(s.strip())           # both ends
print(s.lstrip())          # left only
print(s.rstrip())          # right only

# Case methods
print("hello world".upper())       
print("HELLO WORLD".lower())       
print("hello world".title())       
print("hello world".capitalize())  

# Search methods
text = "Python is amazing and Python is fun"
print(text.find("Python"))        # index of FIRST occurrence
print(text.find("Java"))          # -1 if not found
print(text.count("Python"))       # how many times
print(text.startswith("Python"))  # True/False
print(text.endswith("fun"))       # True/False

# Replace
print(text.replace("Python", "JavaScript"))

# Split and join
csv = "Alice,Bob,Carol,Dave"
names = csv.split(",")            # split into list
print(names)
print(" | ".join(names))          # join list back into string`,
          output:
`Hello, World!
Hello, World!  
  Hello, World!
HELLO WORLD
hello world
Hello World
Hello world
0
-1
2
True
True
JavaScript is amazing and JavaScript is fun
['Alice', 'Bob', 'Carol', 'Dave']
Alice | Bob | Carol | Dave`,
        },
        examples: [
          {
            lang: "python",
            label: "Common mistake: not using the return value",
            code:
`name = "alice"
name.upper()           # WRONG: result is discarded!
print(name)            # still "alice"

name = name.upper()    # CORRECT: assign the result back
print(name)            # "ALICE"

# Or use it directly without reassigning
print("alice".upper()) # "ALICE"`,
            output:
`alice
ALICE
ALICE`,
          },
        ],
      },
      {
        heading: "String indexing and slicing",
        body: [
          "Strings are sequences, meaning each character has a position called an index. Python uses zero-based indexing \u2014 the first character is at index 0, not index 1. This confuses beginners but quickly becomes natural.",
          "Negative indices count from the end: -1 is the last character, -2 is second to last, and so on. This is much more convenient than writing s[len(s)-1].",
          "Slicing lets you extract a substring: s[start:stop:step]. The stop index is exclusive (not included). If you omit start, it defaults to 0. If you omit stop, it defaults to the end. Step lets you skip characters.",
        ],
        code: {
          lang: "python",
          label: "indexing and slicing",
          code:
`s = "Python"
#    P  y  t  h  o  n
#    0  1  2  3  4  5   (positive indices)
#   -6 -5 -4 -3 -2 -1   (negative indices)

# Indexing \u2014 single character
print(s[0])     # P  (first)
print(s[1])     # y
print(s[-1])    # n  (last)
print(s[-2])    # o  (second to last)

# Slicing [start:stop]  (stop is EXCLUSIVE)
print(s[0:3])   # Pyt  (indices 0, 1, 2)
print(s[2:5])   # tho  (indices 2, 3, 4)
print(s[:3])    # Pyt  (start defaults to 0)
print(s[3:])    # hon  (stop defaults to end)
print(s[:])     # Python (full copy)

# Step
print(s[::2])   # Pto  (every 2nd character)
print(s[::-1])  # nohtyP  (reverse!)

# Strings are immutable \u2014 you CANNOT do:
# s[0] = "p"   # TypeError!
# You must create a new string:
lower_p = "p" + s[1:]
print(lower_p)`,
          output:
`P
y
n
o
Pyt
tho
Pyt
hon
Python
Pto
nohtyP
python`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What does 'hello'.upper() return?", options: ["modifies 'hello' to 'HELLO'", "returns 'HELLO' as a new string", "returns None", "raises an error"], answer: 1, explanation: "String methods return NEW strings. They never modify the original because strings are immutable in Python." },
      { type: "predict", q: "What prints?", code: `s = "Python"\nprint(s[-1])\nprint(s[::-1])`, answer: "n\nnohtyP", explanation: "s[-1] is the last character 'n'. s[::-1] reverses the string to 'nohtyP'." },
      { type: "truefalse", q: "Strings in Python are mutable \u2014 you can change individual characters.", answer: false, explanation: "Strings are IMMUTABLE. You cannot change s[0]='X'. To 'modify' a string, you must create a new one." },
      { type: "fillblank", q: "'Alice,Bob,Carol'.split(',') returns a _______ containing the three names.", answer: "list", hint: "split() breaks a string into multiple pieces and puts them in this data structure" },
      { type: "predict", q: "What is the output?", code: `name = "alice"\nprint(f"Hello, {name.title()}! You have {len(name)} letters.")`, answer: "Hello, Alice! You have 5 letters.", explanation: "name.title() capitalizes the first letter -> 'Alice'. len('alice') is 5." },
    ],
  },

  // \u2500\u2500\u2500 LESSON 7 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l7: {
    id: "l7", title: "Numbers: int, float, complex", duration: "10m",
    intro: "Python has three numeric types: int for whole numbers, float for decimal numbers, and complex for complex numbers (used in engineering and scientific computing). You will use int and float constantly.",
    sections: [
      {
        heading: "Integers (int) \u2014 whole numbers with no size limit",
        body: [
          "In Python, integers have no size limit. You can work with numbers with thousands of digits without any overflow. This is very different from languages like C++ or Java where integers have fixed sizes (32-bit or 64-bit).",
          "Python 3 automatically handles large integers seamlessly \u2014 no special data types needed. Want to calculate 2 to the power of 1000? Python does it without blinking.",
          "You can write integers with underscores as visual separators to make large numbers readable. Python ignores the underscores \u2014 they are just for humans.",
        ],
        code: {
          lang: "python",
          label: "integers",
          code:
`# Regular integers
age   = 25
count = -42
zero  = 0

# Large numbers \u2014 underscores for readability
population  = 8_000_000_000    # 8 billion
national_debt = 33_000_000_000_000  # 33 trillion

# Python integers have NO size limit
huge = 2 ** 1000   # 2 to the power of 1000
print(f"2^1000 has {len(str(huge))} digits")

# Integer arithmetic
print(10 + 3)    # 13  addition
print(10 - 3)    # 7   subtraction
print(10 * 3)    # 30  multiplication
print(10 ** 3)   # 1000 exponentiation
print(10 // 3)   # 3   floor division (integer result)
print(10 % 3)    # 1   modulo (remainder)
print(-10 // 3)  # -4  floor rounds DOWN (not toward zero!)`,
          output:
`2^1000 has 302 digits
13
7
30
1000
3
1
-4`,
        },
        warning: "Notice that -10 // 3 gives -4, not -3. Floor division always rounds DOWN (toward negative infinity), not toward zero. This surprises many beginners. -10/3 = -3.333..., and the floor of -3.333 is -4.",
      },
      {
        heading: "Floats \u2014 decimal numbers and their limitations",
        body: [
          "Floats represent decimal numbers. In Python, any number with a decimal point is a float: 3.14, 0.5, -2.7. Division with / always returns a float, even if the result is a whole number: 10/2 gives 5.0, not 5.",
          "Floats support scientific notation: 1.5e6 means 1.5 \u00D7 10^6 = 1,500,000. This is useful for very large or very small numbers.",
          "The critical limitation: floats are stored in binary (base 2) inside the computer, but most decimal fractions cannot be represented exactly in binary. This causes tiny rounding errors that can surprise you if you do not know about them. This is not a Python bug \u2014 it affects every language that uses IEEE 754 floating point (which is almost all of them).",
        ],
        code: {
          lang: "python",
          label: "floats and the precision problem",
          code:
`# Float basics
pi     = 3.14159
temp   = -17.5
tiny   = 0.000001
sci    = 1.5e6       # 1,500,000.0
small  = 2.5e-3      # 0.0025

print(10 / 2)        # 5.0  (always float!)
print(type(10 / 2))  # <class 'float'>

# The famous float precision issue
print(0.1 + 0.2)            # NOT 0.3!
print(0.1 + 0.2 == 0.3)     # False!

# WHY: 0.1 in binary is 0.1000000000000000055511...
# and 0.2 in binary is 0.2000000000000000111022...
# they add up to 0.30000000000000004

# Safe comparison using round()
print(round(0.1 + 0.2, 10) == 0.3)   # True

# For money: use the decimal module
from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))  # 0.3 exactly`,
          output:
`5.0
<class 'float'>
0.30000000000000004
False
True
0.3`,
        },
        tip: "Never use floats for money calculations. 0.1 + 0.2 != 0.3 in floating point. Use Python's decimal module or store money as integers in cents (e.g., $10.99 = 1099 cents).",
      },
      {
        heading: "All arithmetic operators and operator precedence",
        body: [
          "Python follows standard mathematical operator precedence (PEMDAS/BODMAS): parentheses first, then exponentiation, then multiplication/division, then addition/subtraction. Operators at the same level evaluate left to right.",
          "The division operators are often confused: / always returns a float (true division). // returns the floor (integer result of division, rounded down). % returns the remainder (modulo).",
          "The math module provides additional mathematical functions and the mathematical constants pi and e.",
        ],
        code: {
          lang: "python",
          label: "operators and math module",
          code:
`# All arithmetic operators
print(7 + 3)    # 10  addition
print(7 - 3)    # 4   subtraction
print(7 * 3)    # 21  multiplication
print(7 / 3)    # 2.3333...  true division (always float)
print(7 // 3)   # 2   floor division
print(7 % 3)    # 1   modulo (remainder)
print(7 ** 3)   # 343 exponentiation

# Operator precedence
print(2 + 3 * 4)       # 14 (not 20! * before +)
print((2 + 3) * 4)     # 20 (parentheses first)
print(2 ** 3 ** 2)     # 512 (** is right-associative: 3**2=9, 2**9=512)

# math module
import math
print(math.pi)          # 3.141592653589793
print(math.e)           # 2.718281828459045
print(math.sqrt(144))   # 12.0
print(math.ceil(4.1))   # 5  (round up)
print(math.floor(4.9))  # 4  (round down)
print(math.abs(-7))     # 7  (absolute value \u2014 also built-in: abs(-7))
print(round(3.14159, 2))  # 3.14  (built-in, not math module)`,
          output:
`10
4
21
2.3333333333333335
2
1
343
14
20
512
3.141592653589793
2.718281828459045
12.0
5
4
7
3.14`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What does 10 / 2 return in Python 3?", options: ["5 (int)", "5.0 (float)", "5.5", "Error"], answer: 1, explanation: "The / operator ALWAYS returns a float in Python 3, even when the result is a whole number. 10/2 returns 5.0, not 5." },
      { type: "predict", q: "What prints?", code: `print(7 // 2)\nprint(7 % 2)\nprint(-7 // 2)`, answer: "3\n1\n-4", explanation: "7//2=3 (floor), 7%2=1 (remainder). -7//2=-4 because floor rounds DOWN: -7/2=-3.5, floor(-3.5)=-4." },
      { type: "truefalse", q: "0.1 + 0.2 == 0.3 is True in Python.", answer: false, explanation: "Due to floating-point binary representation, 0.1+0.2 = 0.30000000000000004, not exactly 0.3. This is a famous float gotcha." },
      { type: "fillblank", q: "To get the REMAINDER when dividing 17 by 5, use: 17 ___ 5", answer: "%", hint: "This operator is called modulo" },
      { type: "predict", q: "What prints?", code: `print(2 + 3 * 4)\nprint((2 + 3) * 4)`, answer: "14\n20", explanation: "Without parentheses, * is evaluated before +: 3*4=12, then 2+12=14. With parentheses: (2+3)=5, then 5*4=20." },
    ],
  },

  // \u2500\u2500\u2500 LESSON 8 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l8: {
    id: "l8", title: "Booleans and Comparisons", duration: "9m",
    intro: "Booleans represent truth values: True or False. They are the foundation of all decision-making in your programs. Every if statement, every loop condition, every filter \u2014 all of them ultimately evaluate to a boolean.",
    sections: [
      {
        heading: "Boolean values and logical operators",
        body: [
          "Python has exactly two boolean values: True and False. Note the capital T and F \u2014 Python is case-sensitive, so true and false are not booleans (they would be variable names).",
          "The three logical operators are and, or, and not. Unlike many languages that use &&, ||, and !, Python uses the English words, which makes code more readable.",
          "Short-circuit evaluation is a crucial feature: and stops evaluating as soon as it finds a False value. or stops as soon as it finds a True value. This is not just an optimization \u2014 it prevents errors when the second condition would crash if the first is false.",
        ],
        code: {
          lang: "python",
          label: "boolean operators",
          code:
`# Boolean values
print(True)
print(False)
print(type(True))   # <class 'bool'>

# Logical operators
print(True and True)    # True  \u2014 both must be True
print(True and False)   # False
print(False and True)   # False
print(False and False)  # False

print(True or True)     # True  \u2014 at least one must be True
print(True or False)    # True
print(False or False)   # False

print(not True)         # False \u2014 opposite
print(not False)        # True

# Short-circuit evaluation
# 'and' stops at first False \u2014 the 1/0 never runs!
result = False and (1/0 > 0)
print(result)   # False \u2014 no ZeroDivisionError!

# 'or' stops at first True \u2014 the 1/0 never runs!
result = True or (1/0 > 0)
print(result)   # True \u2014 no ZeroDivisionError!`,
          output:
`True
False
<class 'bool'>
True
False
False
False
True
True
False
False
True
False
True`,
        },
      },
      {
        heading: "Comparison operators",
        body: [
          "Comparison operators compare two values and return a boolean. They are the building blocks of conditions in if statements and loops.",
          "A critical distinction: = is assignment (x = 5 stores 5 in x). == is equality comparison (x == 5 asks 'is x equal to 5?'). Confusing these is one of the most common beginner bugs.",
          "Python supports chained comparisons, which are more readable and actually more efficient (the middle expression is only evaluated once):",
        ],
        code: {
          lang: "python",
          label: "comparison operators",
          code:
`x = 10

print(x == 10)   # True   equal to (note: two equals signs!)
print(x != 5)    # True   not equal to
print(x > 5)     # True   greater than
print(x < 5)     # False  less than
print(x >= 10)   # True   greater than or equal
print(x <= 9)    # False  less than or equal

# Chained comparisons \u2014 unique Python feature
age = 25
print(18 <= age <= 65)    # True  \u2014 is age between 18 and 65?
print(0 < x < 100)        # True  \u2014 is x between 0 and 100?
print(1 < 2 < 3 < 4)      # True  \u2014 all increasing

# Comparing strings (alphabetical/lexicographic order)
print("apple" < "banana")   # True  (a comes before b)
print("apple" == "Apple")   # False (case-sensitive!)
print("apple" == "apple")   # True

# Identity vs equality
a = [1, 2, 3]
b = [1, 2, 3]
c = a
print(a == b)   # True  \u2014 same VALUES
print(a is b)   # False \u2014 different OBJECTS in memory
print(a is c)   # True  \u2014 c IS a (same object)`,
          output:
`True
True
True
False
True
False
True
True
True
True
False
True
True
False
True`,
        },
        warning: "Never use 'is' to compare values like numbers or strings. 'is' checks if two variables point to the SAME object in memory, not if they have equal values. Use == for value comparison. 'is' is correct only for checking 'is None'.",
      },
      {
        heading: "Truthiness \u2014 every value has a boolean interpretation",
        body: [
          "In Python, every value can be used in a boolean context (like an if condition), not just True and False. Values that act as True are called 'truthy', and values that act as False are called 'falsy'.",
          "The falsy values in Python are: False, None, 0 (integer zero), 0.0 (float zero), '' (empty string), [] (empty list), {} (empty dict), () (empty tuple), set() (empty set). Everything else is truthy.",
          "This allows for very clean, readable code. Instead of checking if len(name) > 0 to see if a string has content, you can simply write if name:. Instead of checking if items != [], you can write if items:.",
        ],
        code: {
          lang: "python",
          label: "truthiness in practice",
          code:
`# Falsy values \u2014 all evaluate to False in a boolean context
print(bool(False))   # False
print(bool(None))    # False
print(bool(0))       # False
print(bool(0.0))     # False
print(bool(""))      # False \u2014 empty string
print(bool([]))      # False \u2014 empty list
print(bool({}))      # False \u2014 empty dict

# Truthy values \u2014 everything else
print(bool(True))    # True
print(bool(1))       # True
print(bool(-1))      # True \u2014 any non-zero number!
print(bool("hi"))    # True \u2014 non-empty string
print(bool([0]))     # True \u2014 list with one element (even if it's 0)

# Practical use \u2014 Pythonic style
name = input("Enter your name: ")
if name:                    # True if name is not empty
    print(f"Hello, {name}!")
else:
    print("You did not enter a name.")

items = []
if not items:               # True if items is empty
    print("Your cart is empty.")`,
          output:
`False
False
False
False
False
False
False
True
True
True
True
True
Enter your name: Alice
Hello, Alice!`,
        },
        tip: "Writing 'if name:' instead of 'if name != \"\":' or 'if len(name) > 0:' is more Pythonic. It reads like English and is the preferred style.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What is the difference between = and == in Python?", options: ["No difference, they are the same", "= compares, == assigns", "= assigns, == compares", "= is for numbers, == is for strings"], answer: 2, explanation: "= is the assignment operator (stores a value). == is the equality comparison operator (checks if two values are equal)." },
      { type: "truefalse", q: "bool([0]) is False because the list contains a zero.", answer: false, explanation: "bool([0]) is TRUE. A list is falsy only when EMPTY. A list containing one element \u2014 even 0 \u2014 is truthy." },
      { type: "predict", q: "What prints?", code: `print(bool(''))\nprint(bool(' '))\nprint(bool(0))\nprint(bool(0.1))`, answer: "False\nTrue\nFalse\nTrue", explanation: "Empty string is falsy. A string with a space ' ' is non-empty, so truthy. 0 is falsy. 0.1 is non-zero, so truthy." },
      { type: "fillblank", q: "False and (1/0 > 0) does not raise an error because of ______-circuit evaluation.", answer: "short", hint: "Python stops evaluating as soon as the result is determined" },
      { type: "mcq", q: "Which correctly checks if age is between 18 and 65 (inclusive)?", options: ["18 < age < 65", "18 <= age <= 65", "age >= 18 and age <= 65", "Both B and C"], answer: 3, explanation: "Both 18 <= age <= 65 (Python chained comparison) and age >= 18 and age <= 65 are correct and equivalent. B is more Pythonic." },
    ],
  },

};

export function getLessonContent(id: string): LessonContent | undefined {
  return content[id];
}