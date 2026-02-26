export type QuizQuestion =
  | { type: "mcq";     q: string; options: string[]; answer: number; explanation: string }
  | { type: "truefalse"; q: string; answer: boolean; explanation: string }
  | { type: "fillblank"; q: string; answer: string; hint: string }
  | { type: "predict";  q: string; code: string; answer: string; explanation: string };

export type LessonContent2 = {
  id: string;
  title: string;
  duration: string;
  free?: boolean;
  intro: string;
  sections: Array<{
    heading: string;
    body: string;
    code?: { lang: string; code: string; label?: string };
    tip?: string;
    warning?: string;
  }>;
  quiz: QuizQuestion[];
  chapterQuiz?: QuizQuestion[];
};

const lessons: Record<string, LessonContent2> = {

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // MODULE 4 - FUNCTIONS (continued)
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  l16: {
    id: "l16", title: "Parameters and Return Values", duration: "14m",
    intro: "Functions become truly powerful when you can control exactly what goes in and what comes out. Python gives you more parameter flexibility than almost any other language.",
    sections: [
      {
        heading: "Positional vs keyword arguments",
        body: "When calling a function, you can pass arguments by position (order matters) or by keyword (name=value, order does not matter). Mixing both is common and powerful.",
        code: { lang: "python", label: "positional vs keyword", code:
`def describe_pet(name, animal, age):
    print(f"{name} is a {age}-year-old {animal}")

# Positional - order matters
describe_pet("Rex", "dog", 3)

# Keyword - order does not matter
describe_pet(age=3, name="Rex", animal="dog")

# Mix: positional first, then keyword
describe_pet("Rex", age=3, animal="dog")` },
      },
      {
        heading: "Default parameter values",
        body: "You can give parameters a default value. If the caller does not provide that argument, the default is used. Parameters with defaults must come AFTER parameters without defaults.",
        code: { lang: "python", label: "default parameters", code:
`def greet(name, greeting="Hello", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

print(greet("Alice"))              # Hello, Alice!
print(greet("Bob", "Hi"))         # Hi, Bob!
print(greet("Carol", punctuation="..."))  # Hello, Carol...

# WRONG - non-default after default causes SyntaxError
# def bad(x=1, y):   # SyntaxError!
#     pass` },
        warning: "Never use a mutable object (list, dict) as a default parameter. Python creates it once at definition time, not each call. Use None and create inside the function instead.",
      },
      {
        heading: "The mutable default trap",
        body: "This is one of Python's most famous gotchas. Understanding it will save you hours of debugging.",
        code: { lang: "python", label: "mutable default gotcha", code:
`# WRONG - the list is shared across all calls!
def add_item_bad(item, cart=[]):
    cart.append(item)
    return cart

print(add_item_bad("apple"))   # ["apple"]
print(add_item_bad("banana"))  # ["apple", "banana"] - BUG!

# CORRECT - use None, create fresh list each call
def add_item_good(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart

print(add_item_good("apple"))   # ["apple"]
print(add_item_good("banana"))  # ["banana"] - correct!` },
      },
      {
        heading: "*args - accept any number of positional arguments",
        body: "*args collects all extra positional arguments into a tuple. The name args is just a convention; the * is what matters.",
        code: { lang: "python", label: "*args", code:
`def add_all(*numbers):
    print(type(numbers))   # <class 'tuple'>
    return sum(numbers)

print(add_all(1, 2, 3))         # 6
print(add_all(1, 2, 3, 4, 5))   # 15
print(add_all())                 # 0

def log(level, *messages):
    for msg in messages:
        print(f"[{level}] {msg}")

log("INFO", "Server started", "Port 8080")
log("ERROR", "Connection failed")` },
      },
      {
        heading: "**kwargs - accept any number of keyword arguments",
        body: "**kwargs collects all extra keyword arguments into a dict. Combine *args and **kwargs to accept absolutely anything.",
        code: { lang: "python", label: "**kwargs", code:
`def create_profile(**details):
    print(type(details))   # <class 'dict'>
    for key, value in details.items():
        print(f"  {key}: {value}")

create_profile(name="Alice", age=25, city="London")

# Combining everything
def ultimate(pos1, pos2, *args, kw1="default", **kwargs):
    print(f"pos1={pos1}, pos2={pos2}")
    print(f"extra positional: {args}")
    print(f"kw1={kw1}")
    print(f"extra keyword: {kwargs}")

ultimate(1, 2, 3, 4, kw1="custom", x=10, y=20)` },
      },
      {
        heading: "Returning multiple values",
        body: "Python functions can return multiple values. They are actually returned as a tuple and can be unpacked immediately.",
        code: { lang: "python", label: "multiple return values", code:
`def min_max(numbers):
    return min(numbers), max(numbers)   # returns a tuple

result = min_max([3, 1, 4, 1, 5, 9])
print(result)           # (1, 9)
print(type(result))     # <class 'tuple'>

# Unpack directly
low, high = min_max([3, 1, 4, 1, 5, 9])
print(f"Min: {low}, Max: {high}")

def divide(a, b):
    if b == 0:
        return None, "Cannot divide by zero"
    return a / b, None

result, error = divide(10, 2)
print(result)   # 5.0` },
        tip: "Returning None plus an error message (like Go-style error handling) is a clean pattern for functions that might fail.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does *args collect arguments into?", options: ["A list", "A tuple", "A dict", "A set"], answer: 1, explanation: "*args always collects extra positional arguments into a tuple, not a list." },
      { type: "mcq", q: "What does **kwargs collect arguments into?", options: ["A list", "A tuple", "A dict", "A set"], answer: 2, explanation: "**kwargs collects extra keyword arguments into a dictionary." },
      { type: "truefalse", q: "You can use a list as a default parameter value without any issues.", answer: false, explanation: "Mutable defaults like lists are created once at function definition and shared across all calls, causing bugs." },
      { type: "fillblank", q: "To accept any number of keyword arguments, use ** before the parameter name. What is the conventional name? **______", answer: "kwargs", hint: "It stands for 'keyword arguments'" },
      { type: "predict", q: "What does this print?", code: `def f(a, b=2, *args):
    return a + b + sum(args)
print(f(1, 3, 4, 5))`, answer: "13", explanation: "a=1, b=3 (overrides default), args=(4,5). 1+3+4+5=13" },
    ],
  },

  l17: {
    id: "l17", title: "Variable Scope: The LEGB Rule", duration: "11m",
    intro: "When Python looks up a variable name, it searches through four scopes in a specific order. Understanding this prevents some of the most confusing bugs you will encounter.",
    sections: [
      {
        heading: "The four scopes: LEGB",
        body: "LEGB stands for Local, Enclosing, Global, Built-in. Python searches in exactly this order when you use a variable name.",
        code: { lang: "python", label: "LEGB overview", code:
`# Built-in scope: always available (len, print, range, etc.)
# Global scope: defined at module level
x = "global"

def outer():
    x = "enclosing"   # Enclosing scope (for inner functions)

    def inner():
        x = "local"   # Local scope
        print(x)      # "local" - found in L first

    inner()
    print(x)          # "enclosing" - local gone, found in E

outer()
print(x)              # "global" - L and E gone, found in G` },
      },
      {
        heading: "The global keyword",
        body: "By default, assigning to a variable inside a function creates a LOCAL variable, even if a global with the same name exists. Use global to modify the global one.",
        code: { lang: "python", label: "global keyword", code:
`count = 0

def increment():
    # Without global: creates a LOCAL count, does not affect global
    # count += 1  # UnboundLocalError!

    global count   # now refers to the global count
    count += 1

increment()
increment()
print(count)   # 2

# Reading a global is fine without 'global'
name = "Alice"
def greet():
    print(name)   # reads global - no 'global' keyword needed
greet()` },
        warning: "Avoid global whenever possible. Functions that modify globals are harder to test and debug. Prefer returning values and passing arguments.",
      },
      {
        heading: "The nonlocal keyword",
        body: "In nested functions, nonlocal lets an inner function modify a variable in its enclosing (outer) function's scope.",
        code: { lang: "python", label: "nonlocal keyword", code:
`def make_counter():
    count = 0

    def increment():
        nonlocal count   # refers to make_counter's count
        count += 1
        return count

    return increment

counter = make_counter()
print(counter())   # 1
print(counter())   # 2
print(counter())   # 3

# Each call to make_counter() creates a fresh independent counter
counter2 = make_counter()
print(counter2())  # 1 (independent)` },
        tip: "This pattern - a function returning another function that remembers state - is called a closure. It is very powerful and used heavily in decorators.",
      },
      {
        heading: "Common scope bugs",
        body: "These are the scope mistakes that trip up even experienced developers.",
        code: { lang: "python", label: "scope bugs to avoid", code:
`# Bug 1: UnboundLocalError
x = 10
def f():
    print(x)   # UnboundLocalError! Python sees 'x = ...' below
    x = 20     # this makes Python treat x as local throughout f()
# Fix: either use 'global x' or rename the local variable

# Bug 2: Loop variable leaks in Python (unlike JS with let)
for i in range(5):
    pass
print(i)   # 4 - i is still accessible after the loop!

# Bug 3: Late binding closures
funcs = [lambda: i for i in range(3)]
print(funcs[0]())   # 2, not 0!  (all share the same i)
# Fix: use default argument to capture current value
funcs = [lambda i=i: i for i in range(3)]
print(funcs[0]())   # 0 - correct` },
      },
    ],
    quiz: [
      { type: "mcq", q: "What is the correct order Python searches for a variable?", options: ["GBLE", "LEGB", "BELG", "GLEB"], answer: 1, explanation: "Local -> Enclosing -> Global -> Built-in. Remember LEGB." },
      { type: "truefalse", q: "You need the 'global' keyword to READ a global variable inside a function.", answer: false, explanation: "You only need 'global' to ASSIGN to a global variable. Reading it works without the keyword." },
      { type: "predict", q: "What does this print?", code: `x = 1
def f():
    x = 2
    def g():
        print(x)
    g()
f()`, answer: "2", explanation: "g() looks in local (not found), then enclosing (f's x=2). Prints 2." },
      { type: "fillblank", q: "To modify a variable from an outer (but not global) scope, use the ________ keyword.", answer: "nonlocal", hint: "It is the opposite of 'global' but for nested functions" },
      { type: "mcq", q: "What happens if you assign to a variable inside a function without 'global'?", options: ["It modifies the global", "It creates a local variable", "It raises a SyntaxError", "It raises a NameError"], answer: 1, explanation: "Assigning inside a function always creates a local variable unless 'global' or 'nonlocal' is used." },
    ],
  },

  l18: {
    id: "l18", title: "Lambda Functions", duration: "9m",
    intro: "Lambda functions are small anonymous functions defined in a single expression. They are not a replacement for def functions - they have a specific use case and knowing when to use them is key.",
    sections: [
      {
        heading: "Lambda syntax",
        body: "A lambda takes any number of arguments and returns the value of a single expression. No return statement needed. No multi-line code allowed.",
        code: { lang: "python", label: "lambda basics", code:
`# Regular function
def square(x):
    return x ** 2

# Equivalent lambda
square = lambda x: x ** 2

print(square(5))   # 25

# Lambda with multiple arguments
add = lambda x, y: x + y
print(add(3, 4))   # 7

# Lambda with default argument
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"
print(greet("Alice"))          # Hello, Alice!
print(greet("Bob", "Hi"))      # Hi, Bob!` },
        tip: "Assigning a lambda to a variable (like square = lambda x: x**2) defeats the purpose. If you are naming it, use def instead. Lambdas shine when passed directly as arguments.",
      },
      {
        heading: "sorted() with lambda",
        body: "The most common use of lambda is as the key argument to sorted(), sort(), min(), and max().",
        code: { lang: "python", label: "sorted with lambda", code:
`students = [
    {"name": "Alice", "grade": 88},
    {"name": "Bob",   "grade": 95},
    {"name": "Carol", "grade": 72},
]

# Sort by grade (ascending)
by_grade = sorted(students, key=lambda s: s["grade"])
print(by_grade[0]["name"])   # Carol (lowest grade first)

# Sort by grade (descending)
by_grade_desc = sorted(students, key=lambda s: s["grade"], reverse=True)
print(by_grade_desc[0]["name"])   # Bob

# Sort strings by length
words = ["banana", "apple", "kiwi", "elderberry"]
print(sorted(words, key=lambda w: len(w)))
# ["kiwi", "apple", "banana", "elderberry"]

# Sort by multiple criteria: first by grade desc, then name asc
sorted(students, key=lambda s: (-s["grade"], s["name"]))` },
      },
      {
        heading: "map() and filter()",
        body: "map() applies a function to every item in an iterable. filter() keeps only items where the function returns True. Both return lazy iterators - wrap in list() to see the result.",
        code: { lang: "python", label: "map and filter", code:
`numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map: apply function to each element
squares = list(map(lambda x: x ** 2, numbers))
print(squares)   # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# filter: keep elements where function returns True
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)     # [2, 4, 6, 8, 10]

# Chain them: squares of even numbers
result = list(map(lambda x: x**2, filter(lambda x: x%2==0, numbers)))
print(result)    # [4, 16, 36, 64, 100]

# Modern Python: list comprehensions are usually more readable
result = [x**2 for x in numbers if x % 2 == 0]
print(result)    # [4, 16, 36, 64, 100]` },
        tip: "In modern Python, list comprehensions are usually preferred over map() and filter() because they are more readable. But map/filter appear in older codebases and interviews.",
      },
    ],
    quiz: [
      { type: "mcq", q: "How many expressions can a lambda function contain?", options: ["Unlimited", "Two", "One", "Three"], answer: 2, explanation: "A lambda body is a single expression. For multiple statements, use def." },
      { type: "truefalse", q: "lambda x: x*2 and def f(x): return x*2 are functionally identical.", answer: true, explanation: "They produce the same result. The only differences are syntax and that lambda is anonymous." },
      { type: "predict", q: "What does this print?", code: `words = ["hi", "hello", "hey"]
print(sorted(words, key=lambda w: len(w)))`, answer: "['hi', 'hey', 'hello']", explanation: "Sorts by string length: hi(2), hey(3), hello(5)" },
      { type: "fillblank", q: "list(filter(lambda x: x > 3, [1,2,3,4,5])) returns [4, ___]", answer: "5", hint: "Which numbers from the list are greater than 3?" },
      { type: "mcq", q: "When should you prefer a list comprehension over map()+lambda?", options: ["Never", "Always", "When it is more readable", "Only for small lists"], answer: 2, explanation: "The Python community generally prefers list comprehensions for readability, but map() is fine too." },
    ],
  },

  l19: {
    id: "l19", title: "Recursion", duration: "13m",
    intro: "Recursion is when a function calls itself. It is a powerful technique for problems that have a naturally repetitive structure, like trees and divide-and-conquer algorithms.",
    sections: [
      {
        heading: "The two parts of every recursive function",
        body: "Every valid recursive function needs exactly two things: a base case (when to stop) and a recursive case (call itself with a simpler version of the problem). Without a base case, you get infinite recursion.",
        code: { lang: "python", label: "recursion structure", code:
`def countdown(n):
    # BASE CASE: stop when n reaches 0
    if n <= 0:
        print("Blast off!")
        return

    # RECURSIVE CASE: call itself with a smaller problem
    print(n)
    countdown(n - 1)   # n decreases each call -> will reach 0

countdown(5)
# 5, 4, 3, 2, 1, Blast off!` },
      },
      {
        heading: "Factorial: a classic example",
        body: "n! (n factorial) is n * (n-1) * (n-2) * ... * 1. It has a perfect recursive structure: factorial(n) = n * factorial(n-1).",
        code: { lang: "python", label: "factorial", code:
`def factorial(n):
    # Base case
    if n == 0 or n == 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))   # 120
# Call stack:
# factorial(5) = 5 * factorial(4)
#              = 5 * 4 * factorial(3)
#              = 5 * 4 * 3 * factorial(2)
#              = 5 * 4 * 3 * 2 * factorial(1)
#              = 5 * 4 * 3 * 2 * 1
#              = 120

# Edge cases to handle
def factorial_safe(n):
    if not isinstance(n, int) or n < 0:
        raise ValueError("n must be a non-negative integer")
    if n == 0 or n == 1:
        return 1
    return n * factorial_safe(n - 1)` },
      },
      {
        heading: "Fibonacci sequence",
        body: "The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13... Each number is the sum of the two before it. This is a common recursion example but also demonstrates WHY naive recursion can be slow.",
        code: { lang: "python", label: "fibonacci", code:
`# Naive recursive - correct but SLOW (exponential time)
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n-1) + fib_slow(n-2)

# fib_slow(50) would take HOURS - it recalculates the same values
# millions of times

# Fixed with memoization (caching results)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_fast(n):
    if n <= 1:
        return n
    return fib_fast(n-1) + fib_fast(n-2)

print(fib_fast(50))    # instant: 12586269025
print(fib_fast(100))   # instant: 354224848179261915075` },
        tip: "The @lru_cache decorator caches function results. The second time fib_fast(10) is called, it returns the cached result instantly instead of recalculating.",
      },
      {
        heading: "Recursion limits and when not to use it",
        body: "Python has a default recursion limit of 1000 calls. Deep recursion will crash with RecursionError. For most real-world problems, an iterative solution with a loop is safer and faster.",
        code: { lang: "python", label: "recursion limits", code:
`import sys
print(sys.getrecursionlimit())   # 1000

# This crashes at depth 1000
def infinite(n):
    return infinite(n + 1)

# For large inputs, use iteration instead of recursion
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# You CAN increase the limit, but it is rarely the right solution
# sys.setrecursionlimit(10000)` },
        warning: "Recursion is elegant but Python is not optimized for it (no tail-call optimization). For production code processing large inputs, prefer iterative solutions.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What happens if a recursive function has no base case?", options: ["It returns None", "It runs forever then crashes with RecursionError", "Python detects it and stops automatically", "It raises a SyntaxError"], answer: 1, explanation: "Without a base case, the function calls itself forever until Python's recursion limit is hit, causing RecursionError." },
      { type: "truefalse", q: "Python's default recursion limit is 1000.", answer: true, explanation: "sys.getrecursionlimit() returns 1000. You can change it with sys.setrecursionlimit() but this is rarely the right solution." },
      { type: "predict", q: "What does factorial(4) return?", code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)
print(factorial(4))`, answer: "24", explanation: "4 * 3 * 2 * 1 = 24" },
      { type: "fillblank", q: "The @lru_cache decorator stores previous results to avoid recalculation. This technique is called ________.", answer: "memoization", hint: "It sounds like 'memorization' but spelled differently" },
      { type: "mcq", q: "For very deep recursion with large inputs, what is usually better?", options: ["Increasing the recursion limit", "Using an iterative solution", "Using global variables", "Using classes"], answer: 1, explanation: "Iterative solutions with loops do not have a stack depth limit and are usually faster in Python." },
    ],
    chapterQuiz: [
      { type: "mcq", q: "Which parameter type collects extra positional arguments into a tuple?", options: ["**kwargs", "*args", "default", "optional"], answer: 1, explanation: "*args collects extra positional arguments into a tuple." },
      { type: "predict", q: "What is the output?", code: `def f(x, y=10):
    return x * y
print(f(3))
print(f(3, 4))`, answer: "30\n12", explanation: "First call: x=3, y=10(default) -> 30. Second: x=3, y=4 -> 12." },
      { type: "truefalse", q: "In LEGB, Python checks Global scope before Local scope.", answer: false, explanation: "LEGB order is Local first, then Enclosing, then Global, then Built-in." },
      { type: "fillblank", q: "sorted([3,1,2], key=lambda x: -x) returns [3, 2, ___]", answer: "1", hint: "Negating x sorts in descending order" },
      { type: "mcq", q: "What is a closure?", options: ["A function with no parameters", "A function that returns another function remembering its enclosing scope", "A function that raises an exception", "A function with default arguments"], answer: 1, explanation: "A closure is an inner function that captures and remembers variables from its enclosing scope even after the outer function has returned." },
      { type: "predict", q: "What prints?", code: `x = "global"
def outer():
    x = "outer"
    def inner():
        print(x)
    return inner
outer()()`, answer: "outer", explanation: "inner() closes over outer's x='outer'. When called as outer()(), it prints 'outer'." },
      { type: "truefalse", q: "list(map(lambda x: x*2, [1,2,3])) equals [2, 4, 6]", answer: true, explanation: "map applies the lambda to each element: 1*2=2, 2*2=4, 3*2=6." },
      { type: "fillblank", q: "The base case in a recursive function is what tells it when to ______.", answer: "stop", hint: "Without this, you get infinite recursion" },
    ],
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // MODULE 5 - DATA STRUCTURES
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  l20: {
    id: "l20", title: "Lists: Creation and Operations", duration: "14m",
    intro: "Lists are Python's most versatile built-in data structure. They are ordered, mutable, and can hold any mix of data types. You will use them in almost every Python program you write.",
    sections: [
      {
        heading: "Creating and accessing lists",
        body: "Lists are created with square brackets. Elements are accessed by index, starting at 0. Negative indices count from the end.",
        code: { lang: "python", label: "list basics", code:
`# Creating lists
empty      = []
numbers    = [1, 2, 3, 4, 5]
mixed      = [1, "hello", 3.14, True, None]
nested     = [[1, 2], [3, 4], [5, 6]]

# Accessing elements
fruits = ["apple", "banana", "cherry", "date"]
print(fruits[0])    # "apple"   (first)
print(fruits[-1])   # "date"    (last)
print(fruits[-2])   # "cherry"  (second from end)

# Slicing [start:stop:step]  (stop is exclusive)
print(fruits[1:3])   # ["banana", "cherry"]
print(fruits[:2])    # ["apple", "banana"]   (from start)
print(fruits[2:])    # ["cherry", "date"]    (to end)
print(fruits[::2])   # ["apple", "cherry"]   (every 2nd)
print(fruits[::-1])  # ["date","cherry","banana","apple"] (reversed)` },
      },
      {
        heading: "Modifying lists",
        body: "Lists are mutable - you can change them after creation. Python provides many ways to add, update, and remove elements.",
        code: { lang: "python", label: "modifying lists", code:
`fruits = ["apple", "banana", "cherry"]

# Adding elements
fruits.append("date")          # add to end
fruits.insert(1, "avocado")    # insert at index 1
fruits.extend(["elderberry", "fig"])  # add multiple

# Updating elements
fruits[0] = "APPLE"            # replace by index
fruits[1:3] = ["mango", "grape"]  # replace a slice

# Removing elements
fruits.remove("mango")         # remove by VALUE (first match)
popped = fruits.pop()          # remove and return last element
popped2 = fruits.pop(0)        # remove and return at index 0
del fruits[0]                  # delete by index (no return)
fruits.clear()                 # remove all elements` },
      },
      {
        heading: "Searching and sorting",
        body: "Lists have built-in methods for finding elements and sorting.",
        code: { lang: "python", label: "search and sort", code:
`nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

print(nums.index(5))    # 4 - index of FIRST occurrence
print(nums.count(1))    # 2 - how many times 1 appears
print(5 in nums)        # True - membership test

# Sorting
nums.sort()                    # sorts IN PLACE, returns None
print(nums)  # [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]

nums.sort(reverse=True)        # descending
print(nums[0])  # 9

# sorted() returns a NEW sorted list, original unchanged
original = [3, 1, 2]
new_sorted = sorted(original)
print(original)    # [3, 1, 2] - unchanged
print(new_sorted)  # [1, 2, 3]` },
      },
      {
        heading: "Copying lists - shallow vs deep",
        body: "This is a critical concept. Assigning a list to a new variable does NOT create a copy. It creates a second reference to the SAME list.",
        code: { lang: "python", label: "list copying", code:
`# WRONG: assignment creates a reference, not a copy
a = [1, 2, 3]
b = a          # b points to THE SAME list
b.append(4)
print(a)       # [1, 2, 3, 4] - a was changed too!

# Shallow copy options (all equivalent for flat lists)
b = a.copy()
b = a[:]
b = list(a)
b = a.copy()
b.append(4)
print(a)   # [1, 2, 3] - a unchanged

# Deep copy needed for nested lists
import copy
nested = [[1, 2], [3, 4]]
shallow = nested.copy()
shallow[0].append(99)
print(nested[0])   # [1, 2, 99] - still affected!

deep = copy.deepcopy(nested)
deep[0].append(99)
print(nested[0])   # [1, 2, 99] - unaffected` },
        warning: "The shallow vs deep copy distinction trips up even experienced programmers. When in doubt with nested structures, use copy.deepcopy().",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does fruits[-1] return?", options: ["The first element", "The last element", "A SyntaxError", "None"], answer: 1, explanation: "Negative indexing counts from the end. -1 is the last element, -2 is second from last, etc." },
      { type: "truefalse", q: "list.sort() and sorted(list) both return a new sorted list.", answer: false, explanation: "list.sort() sorts IN PLACE and returns None. sorted(list) returns a NEW sorted list and leaves the original unchanged." },
      { type: "predict", q: "What prints?", code: `a = [1, 2, 3]
b = a
b.append(4)
print(len(a))`, answer: "4", explanation: "b = a creates a reference, not a copy. Both a and b point to the same list, so appending to b affects a too." },
      { type: "fillblank", q: "[1,2,3,4,5][::-1] gives the list in ________ order.", answer: "reversed", hint: "Step of -1 goes backwards" },
      { type: "mcq", q: "Which method removes an element by VALUE (not by index)?", options: ["pop()", "del", "remove()", "clear()"], answer: 2, explanation: "remove(value) removes the first occurrence of the value. pop(index) removes by index. del also uses index." },
    ],
  },

  l21: {
    id: "l21", title: "List Comprehensions", duration: "12m",
    intro: "List comprehensions are one of Python's most loved features. They let you build lists in a single, readable line. Once you master them, you will use them constantly.",
    sections: [
      {
        heading: "Basic syntax",
        body: "The pattern is: [expression for item in iterable]. Read it as 'expression for each item in iterable'.",
        code: { lang: "python", label: "basic comprehensions", code:
`# Traditional loop approach
squares = []
for n in range(1, 6):
    squares.append(n ** 2)

# List comprehension - same result, one line
squares = [n ** 2 for n in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]

# More examples
chars   = [c for c in "Python"]         # ['P','y','t','h','o','n']
upper   = [s.upper() for s in ["hi", "hello"]]  # ['HI', 'HELLO']
lengths = [len(w) for w in ["cat", "elephant", "dog"]]  # [3, 8, 3]
doubled = [x * 2 for x in range(5)]    # [0, 2, 4, 6, 8]` },
      },
      {
        heading: "Filtering with if",
        body: "Add an if condition at the end to filter which items are included.",
        code: { lang: "python", label: "filtering", code:
`numbers = range(1, 21)

# Only even numbers
evens  = [n for n in numbers if n % 2 == 0]
print(evens)   # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Only strings longer than 3 chars
words  = ["cat", "elephant", "ox", "python", "gnu"]
long   = [w for w in words if len(w) > 3]
print(long)    # ['elephant', 'python']

# Combine filtering and transformation
even_squares = [n**2 for n in range(1, 11) if n % 2 == 0]
print(even_squares)   # [4, 16, 36, 64, 100]

# Filter from a list of dicts
students = [{"name":"Alice","grade":88}, {"name":"Bob","grade":55}]
passing = [s["name"] for s in students if s["grade"] >= 60]
print(passing)   # ["Alice"]` },
      },
      {
        heading: "if-else inside comprehensions",
        body: "The if-else for the expression (not filtering) goes BEFORE the for, not after.",
        code: { lang: "python", label: "if-else in comprehension", code:
`# Label each number as even or odd
labels = ["even" if n%2==0 else "odd" for n in range(6)]
print(labels)   # ['even', 'odd', 'even', 'odd', 'even', 'odd']

# Convert to absolute values
nums = [-3, 1, -2, 4, -5]
abs_vals = [n if n >= 0 else -n for n in nums]
print(abs_vals)   # [3, 1, 2, 4, 5]

# Note the difference:
# FILTER (if at end):      [x for x in nums if x > 0]  -> removes negatives
# TRANSFORM (if-else before for): [x if x>0 else 0 for x in nums] -> keeps all, replaces` },
        tip: "Remember: filter if goes AFTER the for. Transform if-else goes BEFORE the for. This trips up many beginners.",
      },
      {
        heading: "Nested comprehensions",
        body: "You can nest comprehensions for multi-dimensional data. Read the outer loop first.",
        code: { lang: "python", label: "nested comprehensions", code:
`# Flatten a 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [n for row in matrix for n in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Generate a multiplication table
table = [[i*j for j in range(1, 4)] for i in range(1, 4)]
print(table)
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# Dict and set comprehensions (same idea, different brackets)
squares_dict = {n: n**2 for n in range(1, 6)}
print(squares_dict)   # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

unique_lengths = {len(w) for w in ["cat","dog","elephant","ox"]}
print(unique_lengths)  # {2, 3, 8}` },
      },
    ],
    quiz: [
      { type: "predict", q: "What does this produce?", code: `result = [x**2 for x in range(5) if x % 2 != 0]
print(result)`, answer: "[1, 9]", explanation: "Odd numbers in range(5) are 1 and 3. 1**2=1, 3**2=9." },
      { type: "fillblank", q: "[n for n in range(10) if n % 3 == 0] -> [0, 3, 6, ___]", answer: "9", hint: "Multiples of 3 up to 9" },
      { type: "truefalse", q: "['even' if n%2==0 else 'odd' for n in range(3)] produces ['even','odd','even']", answer: true, explanation: "n=0: even, n=1: odd, n=2: even. Correct." },
      { type: "mcq", q: "What does {n: n**2 for n in range(3)} produce?", options: ["[0, 1, 4]", "{0:0, 1:1, 2:4}", "(0, 1, 4)", "{0, 1, 4}"], answer: 1, explanation: "Curly braces with key:value pairs create a dictionary comprehension." },
      { type: "predict", q: "What prints?", code: `matrix = [[1,2],[3,4]]
flat = [n for row in matrix for n in row]
print(flat)`, answer: "[1, 2, 3, 4]", explanation: "Outer loop: row=[1,2] then row=[3,4]. Inner loop: n for each element. Result: [1,2,3,4]." },
    ],
  },

  l22: {
    id: "l22", title: "Tuples and When to Use Them", duration: "9m",
    intro: "Tuples are like lists but immutable - once created, they cannot be changed. This immutability is a feature, not a limitation. It signals intent and enables powerful patterns.",
    sections: [
      {
        heading: "Creating and accessing tuples",
        body: "Tuples use parentheses (or nothing at all). The comma is what makes a tuple, not the parentheses.",
        code: { lang: "python", label: "tuple basics", code:
`# Creating tuples
empty   = ()
single  = (1,)        # comma required! (1) is just 1 in parentheses
coords  = (10.5, 20.3)
rgb     = (255, 128, 0)
mixed   = (1, "hello", True)

# Parentheses are optional
point   = 3, 4         # this is a tuple!
print(type(point))     # <class 'tuple'>

# Accessing (same as lists)
print(coords[0])    # 10.5
print(coords[-1])   # 20.3

# Tuples support slicing too
nums = (1, 2, 3, 4, 5)
print(nums[1:3])    # (2, 3)

# Tuples are immutable
coords[0] = 999     # TypeError: 'tuple' object does not support item assignment` },
        warning: "A single-element tuple MUST have a trailing comma: (1,). Without the comma, (1) is just the integer 1 in parentheses.",
      },
      {
        heading: "Tuple unpacking",
        body: "Tuple unpacking is one of Python's most elegant features. You have already seen it with multiple return values and for loops.",
        code: { lang: "python", label: "tuple unpacking", code:
`# Basic unpacking
x, y = (10, 20)
print(x, y)   # 10 20

# Swap variables (uses tuple packing/unpacking)
a, b = 1, 2
a, b = b, a
print(a, b)   # 2 1

# Ignore values with _
first, _, last = (1, 2, 3)
print(first, last)   # 1 3

# Extended unpacking with *
first, *rest = (1, 2, 3, 4, 5)
print(first)   # 1
print(rest)    # [2, 3, 4, 5]  <- note: rest becomes a list

first, *middle, last = (1, 2, 3, 4, 5)
print(middle)  # [2, 3, 4]` },
      },
      {
        heading: "When to use tuples vs lists",
        body: "The choice between tuple and list communicates intent. Tuples are for heterogeneous data with a fixed structure. Lists are for homogeneous data of variable length.",
        code: { lang: "python", label: "tuple vs list", code:
`# Use a TUPLE for: fixed structure, mixed types, coordinates, records
point      = (x, y)          # 2D point always has exactly 2 values
person     = ("Alice", 25)   # record: name + age
rgb        = (255, 128, 0)   # always 3 color channels

# Use a LIST for: collections of same type, variable size
students   = ["Alice", "Bob", "Carol"]  # can add/remove
scores     = [88, 95, 72]               # same type, variable

# Tuples as dictionary keys (lists cannot be dict keys!)
locations = {}
locations[(40.7, -74.0)] = "New York"   # tuple key works
locations[[40.7, -74.0]] = "New York"   # TypeError! lists are not hashable

# Named tuples: best of both worlds
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x)        # 10 - access by name
print(p[0])       # 10 - access by index too` },
        tip: "A good rule: if the data is 'a collection of the same things', use a list. If the data is 'one thing made up of different parts', use a tuple.",
      },
    ],
    quiz: [
      { type: "truefalse", q: "(1) creates a single-element tuple.", answer: false, explanation: "(1) is just the integer 1 in parentheses. You need (1,) with a trailing comma for a single-element tuple." },
      { type: "predict", q: "What prints?", code: `first, *rest = (10, 20, 30, 40)
print(first)
print(type(rest))`, answer: "10\n<class 'list'>", explanation: "first=10, *rest captures [20,30,40] as a LIST (not a tuple)." },
      { type: "mcq", q: "Why can tuples be used as dictionary keys but lists cannot?", options: ["Tuples are faster", "Tuples are hashable because they are immutable", "Lists are too long", "It is just a Python rule with no reason"], answer: 1, explanation: "Dictionary keys must be hashable. Tuples are immutable so Python can compute a stable hash for them. Mutable lists cannot be hashed." },
      { type: "fillblank", q: "a, b = b, a is a Pythonic way to ________ two variables.", answer: "swap", hint: "You exchange their values" },
      { type: "mcq", q: "Which is best for storing a person's (name, age, email)?", options: ["A list", "A tuple", "A set", "A string"], answer: 1, explanation: "A tuple is ideal for a fixed-structure heterogeneous record like (name, age, email). It signals the structure is intentional and fixed." },
    ],
  },

  l23: {
    id: "l23", title: "Dictionaries", duration: "15m",
    intro: "Dictionaries are Python's key-value store. They are incredibly fast at looking up values by key and are used everywhere - JSON data, function kwargs, counting, grouping, and more.",
    sections: [
      {
        heading: "Creating and accessing dictionaries",
        body: "Dictionaries store key-value pairs. Keys must be hashable (strings, numbers, tuples). Values can be anything.",
        code: { lang: "python", label: "dict basics", code:
`# Creating dictionaries
empty  = {}
person = {"name": "Alice", "age": 25, "city": "London"}
mixed  = {1: "one", "two": 2, (3,): [3]}  # various key types

# Accessing values
print(person["name"])       # "Alice"
print(person.get("name"))   # "Alice"  (same)
print(person.get("phone"))  # None     (no KeyError!)
print(person.get("phone", "N/A"))  # "N/A"  (default value)

# person["phone"] would raise KeyError!
# Use .get() when the key might not exist

# Checking for keys
print("name" in person)    # True
print("phone" in person)   # False` },
      },
      {
        heading: "Modifying dictionaries",
        body: "Dictionaries are mutable. You can add, update, and remove key-value pairs at any time.",
        code: { lang: "python", label: "modifying dicts", code:
`person = {"name": "Alice", "age": 25}

# Adding or updating
person["city"] = "London"    # add new key
person["age"]  = 26          # update existing key
person.update({"city": "Paris", "job": "Dev"})  # update multiple

# Removing
del person["city"]           # delete by key
removed = person.pop("age")  # delete and return value
print(removed)   # 26
person.pop("nonexistent", None)  # safe pop with default

# Merging dicts (Python 3.9+)
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 99, "c": 3}
merged = dict1 | dict2          # {a:1, b:99, c:3}  (dict2 wins)
dict1 |= dict2                  # update dict1 in place` },
      },
      {
        heading: "Iterating over dictionaries",
        body: "Dictionaries maintain insertion order (Python 3.7+). You can iterate over keys, values, or both.",
        code: { lang: "python", label: "iterating dicts", code:
`scores = {"Alice": 95, "Bob": 87, "Carol": 92}

# Iterate over keys (default)
for name in scores:
    print(name)

# Iterate over values
for score in scores.values():
    print(score)

# Iterate over key-value pairs (most common)
for name, score in scores.items():
    print(f"{name}: {score}")

# Dict comprehension
squared = {k: v**2 for k, v in {"a":2,"b":3}.items()}
print(squared)   # {"a": 4, "b": 9}` },
      },
      {
        heading: "Common dict patterns",
        body: "Dictionaries enable several powerful programming patterns you will use constantly.",
        code: { lang: "python", label: "dict patterns", code:
`from collections import defaultdict, Counter

# Pattern 1: Counting items
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
print(counts)  # {"apple":3, "banana":2, "cherry":1}

# Easier with Counter
counts = Counter(words)
print(counts.most_common(2))  # [('apple',3), ('banana',2)]

# Pattern 2: Grouping with defaultdict
from collections import defaultdict
students = [("Math","Alice"),("English","Bob"),("Math","Carol")]
by_class = defaultdict(list)
for subject, name in students:
    by_class[subject].append(name)
print(dict(by_class))  # {"Math":["Alice","Carol"],"English":["Bob"]}

# Pattern 3: Inverting a dict
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: "a", 2: "b", 3: "c"}` },
        tip: "defaultdict(list) is incredibly useful for grouping. It automatically creates an empty list for any key that does not exist yet, saving you the if key not in dict check.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does dict.get('key', 'default') return if 'key' does not exist?", options: ["KeyError", "None", "The default value", "False"], answer: 2, explanation: "dict.get(key, default) returns the default value (not None, not an error) when the key is not found." },
      { type: "truefalse", q: "Python dictionaries maintain insertion order (Python 3.7+).", answer: true, explanation: "Since Python 3.7, dicts are guaranteed to maintain insertion order as an official language feature." },
      { type: "predict", q: "What prints?", code: `d = {"a": 1, "b": 2}
d.update({"b": 99, "c": 3})
print(d["b"])`, answer: "99", explanation: "update() overwrites existing keys. 'b' gets updated from 2 to 99." },
      { type: "fillblank", q: "To get all key-value pairs as tuples, call dict.________()", answer: "items", hint: "You use this in 'for k, v in dict.______()'" },
      { type: "mcq", q: "Which is the best way to count occurrences of items in a list?", options: ["A for loop with a list", "collections.Counter", "sorted()", "A set"], answer: 1, explanation: "collections.Counter is purpose-built for counting. It creates a dict-like object mapping each item to its count." },
    ],
  },

  l24: {
    id: "l24", title: "Sets", duration: "10m",
    intro: "Sets are unordered collections of unique elements. They are blazingly fast for membership testing and are perfect for removing duplicates and doing mathematical set operations.",
    sections: [
      {
        heading: "Creating and using sets",
        body: "Sets use curly braces but have NO key-value pairs (that would be a dict). Sets automatically eliminate duplicates.",
        code: { lang: "python", label: "set basics", code:
`# Creating sets
empty   = set()        # NOT {} - that creates an empty dict!
nums    = {1, 2, 3, 4, 5}
letters = set("hello")  # {'h', 'e', 'l', 'o'} - duplicates removed

# Sets eliminate duplicates automatically
data = [1, 2, 2, 3, 3, 3, 4]
unique = set(data)
print(unique)   # {1, 2, 3, 4}

# Convert back to list
unique_list = list(unique)

# Membership testing (much faster than list for large data!)
approved = {"alice", "bob", "carol"}
print("alice" in approved)    # True  (very fast!)
print("dave" in approved)     # False

# Sets are UNORDERED - no indexing!
print(nums[0])   # TypeError! sets don't support indexing` },
        warning: "You cannot index a set. Sets have no guaranteed order. If you need to access elements by position, convert to a list first.",
      },
      {
        heading: "Set operations",
        body: "Sets support mathematical set operations: union, intersection, difference, and symmetric difference. These are extremely useful for comparing collections.",
        code: { lang: "python", label: "set operations", code:
`python_devs = {"Alice", "Bob", "Carol", "Dave"}
js_devs     = {"Bob", "Carol", "Eve", "Frank"}

# Union: all developers (in either or both)
all_devs = python_devs | js_devs
# or: python_devs.union(js_devs)
print(all_devs)  # {"Alice","Bob","Carol","Dave","Eve","Frank"}

# Intersection: developers who know BOTH
both = python_devs & js_devs
# or: python_devs.intersection(js_devs)
print(both)  # {"Bob", "Carol"}

# Difference: Python devs who do NOT know JS
python_only = python_devs - js_devs
# or: python_devs.difference(js_devs)
print(python_only)  # {"Alice", "Dave"}

# Symmetric difference: in one but not both
exclusive = python_devs ^ js_devs
print(exclusive)  # {"Alice","Dave","Eve","Frank"}` },
      },
      {
        heading: "Set methods and practical uses",
        body: "Sets have methods for modifying them and for checking subset/superset relationships.",
        code: { lang: "python", label: "set methods", code:
`s = {1, 2, 3}

# Adding/removing
s.add(4)            # add single element
s.update([5, 6])    # add multiple elements
s.remove(3)         # remove (raises KeyError if not found)
s.discard(99)       # remove safely (no error if not found)

# Subset and superset
a = {1, 2}
b = {1, 2, 3, 4}
print(a.issubset(b))    # True  (a is entirely in b)
print(b.issuperset(a))  # True  (b contains all of a)
print(a <= b)           # True  (same as issubset)
print(a.isdisjoint({5, 6}))  # True (no common elements)

# Practical: remove duplicates while preserving order
def unique_ordered(lst):
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

print(unique_ordered([3,1,2,1,3]))  # [3, 1, 2]` },
        tip: "set membership testing (x in my_set) is O(1) - instant regardless of set size. List membership testing (x in my_list) is O(n) - gets slower as the list grows. For large lookups, always use a set.",
      },
    ],
    quiz: [
      { type: "mcq", q: "How do you create an empty set?", options: ["{}", "set()", "[]", "()"], answer: 1, explanation: "{} creates an empty DICTIONARY, not a set. You must use set() for an empty set." },
      { type: "predict", q: "What prints?", code: `s = set([1, 2, 2, 3, 3, 3])
print(len(s))`, answer: "3", explanation: "Sets eliminate duplicates. {1,2,2,3,3,3} becomes {1,2,3} with length 3." },
      { type: "truefalse", q: "Sets support indexing like s[0].", answer: false, explanation: "Sets are unordered and do not support indexing. To access by position, convert to a list first." },
      { type: "fillblank", q: "{1,2,3} & {2,3,4} gives the ____________ of the two sets.", answer: "intersection", hint: "Elements present in BOTH sets" },
      { type: "mcq", q: "Why is 'x in my_set' faster than 'x in my_list' for large collections?", options: ["Sets are sorted", "Sets use hashing so lookup is O(1)", "Lists search sequentially so lookup is O(n)", "Both B and C are correct"], answer: 3, explanation: "Sets use a hash table for O(1) lookup regardless of size. Lists scan every element so it takes O(n) time. Both B and C explain this." },
    ],
  },

  l25: {
    id: "l25", title: "Choosing the Right Data Structure", duration: "8m",
    intro: "Knowing Python's data structures is one thing. Knowing WHICH one to use in a given situation is what separates good code from great code.",
    sections: [
      {
        heading: "The decision guide",
        body: "Ask these questions in order to pick the right structure.",
        code: { lang: "python", label: "decision flowchart", code:
`# Q1: Do you need key-value pairs?
#   YES -> dict  {"name": "Alice", "age": 25}
#   NO  -> continue

# Q2: Do you need uniqueness / set operations?
#   YES -> set   {"alice", "bob", "carol"}
#   NO  -> continue

# Q3: Is the data fixed and should not change?
#   YES -> tuple  (lat, lon) or (r, g, b)
#   NO  -> list   [1, 2, 3, 4, 5]

# Examples:
shopping_cart = ["milk", "eggs", "bread"]  # list: ordered, grows/shrinks
visited_urls  = {"google.com", "github.com"}  # set: no duplicates
config        = {"debug": True, "port": 8080}  # dict: key-value lookup
pixel         = (255, 128, 0)  # tuple: fixed 3 values, immutable` },
      },
      {
        heading: "Time complexity comparison",
        body: "Understanding the speed of common operations helps you write efficient code.",
        code: { lang: "python", label: "time complexity", code:
`# LOOKUP / MEMBERSHIP TEST:
# list:  O(n) - scans every element
# set:   O(1) - hash lookup
# dict:  O(1) - hash lookup
# tuple: O(n) - scans every element

# INSERTION:
# list.append():  O(1) amortized
# list.insert(0): O(n) - shifts all elements
# set.add():      O(1)
# dict[k]=v:      O(1)

# When it matters:
import time

big_list = list(range(10_000_000))
big_set  = set(range(10_000_000))

# Check if 9_999_999 is in each
start = time.time(); 9_999_999 in big_list; list_time = time.time()-start
start = time.time(); 9_999_999 in big_set;  set_time  = time.time()-start

print(f"List: {list_time:.4f}s")  # ~0.1 seconds
print(f"Set:  {set_time:.6f}s")   # ~0.000001 seconds` },
        tip: "If you find yourself checking 'if x in my_list' inside a loop, consider converting my_list to a set first. It can make code thousands of times faster.",
      },
      {
        heading: "Real-world examples",
        body: "Let us put it all together with realistic scenarios.",
        code: { lang: "python", label: "real-world examples", code:
`# Scenario 1: Store and look up user data by ID
# -> dict (fast lookup by key)
users = {
    "u001": {"name": "Alice", "role": "admin"},
    "u002": {"name": "Bob",   "role": "user"},
}

# Scenario 2: Track which users have logged in today
# -> set (fast membership, no duplicates)
logged_in_today = {"alice", "carol"}

# Scenario 3: Process a list of transactions in order
# -> list (ordered, can have duplicates, need to iterate)
transactions = [100.00, -50.00, 200.00, -30.00]

# Scenario 4: Represent a 2D coordinate
# -> tuple (fixed, immutable, hashable - can be dict key)
waypoints = {(40.7, -74.0): "New York", (51.5, -0.1): "London"}

# Scenario 5: Count word frequencies in a document
# -> Counter (dict subclass) or defaultdict
from collections import Counter
text = "the cat sat on the mat the cat"
freqs = Counter(text.split())
print(freqs.most_common(3))  # [('the',3),('cat',2),('sat',1)]` },
      },
    ],
    quiz: [
      { type: "mcq", q: "You need to store 10 million user IDs and quickly check if a specific ID exists. Which structure is best?", options: ["list", "tuple", "set", "string"], answer: 2, explanation: "Set membership testing is O(1) regardless of size. A list would be O(n), taking up to 10 million comparisons." },
      { type: "truefalse", q: "A tuple can be used as a dictionary key, but a list cannot.", answer: true, explanation: "Tuples are immutable and hashable so they can be dict keys. Lists are mutable and not hashable." },
      { type: "mcq", q: "You are building a shopping cart that needs to support adding items, removing items, and iterating in order. Which structure?", options: ["set", "dict", "list", "tuple"], answer: 2, explanation: "A list is ordered, mutable, allows duplicates, and supports easy iteration - perfect for a shopping cart." },
      { type: "predict", q: "What prints?", code: `d = {}
for c in "mississippi":
    d[c] = d.get(c, 0) + 1
print(d["s"])`, answer: "4", explanation: "Count character frequencies: m=1, i=4, s=4, p=2. d['s'] = 4." },
      { type: "fillblank", q: "list.append() is O(1) but list.insert(0, x) is O(___) because it shifts all elements.", answer: "n", hint: "Big-O notation for linear time" },
    ],
  },

};

export function getLessonContent2(lessonId: string): LessonContent2 | undefined {
  return lessons[lessonId];
}