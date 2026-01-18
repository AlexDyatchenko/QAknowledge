Sure! Let’s go through **pytest**, a very popular Python testing framework. I’ll explain its usage step by step and provide examples.

---

## **1. What is pytest?**

* `pytest` is a framework for writing **unit tests**, **functional tests**, and **integration tests** in Python.
* It is simple, readable, and has powerful features like fixtures, parametrization, and plugins.
* It automatically discovers tests if they follow **naming conventions** (`test_*.py` files, functions starting with `test_`).

---

## **2. Installing pytest**

```bash
pip install pytest
```

Check version:

```bash
pytest --version
```

---

## **3. Writing a simple test**

Create a file `test_sample.py`:

```python
# test_sample.py

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

# Test functions
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_subtract():
    assert subtract(5, 3) == 2
    assert subtract(0, 4) == -4
```

### **Notes:**

* Test functions **must start with `test_`**.
* `assert` is used to check results.

---

## **4. Running tests**

From the terminal:

```bash
pytest
```

Example output:

```
============================= test session starts =============================
collected 2 items

test_sample.py ..                                                        [100%]

============================== 2 passed in 0.03s =============================
```

* `.` means test passed.
* `F` means test failed.

---

## **5. Using fixtures**

Fixtures allow setup/teardown of test data or environment.

```python
# test_fixture.py
import pytest

@pytest.fixture
def sample_data():
    return {"a": 10, "b": 5}

def test_add(sample_data):
    result = sample_data["a"] + sample_data["b"]
    assert result == 15

def test_subtract(sample_data):
    result = sample_data["a"] - sample_data["b"]
    assert result == 5
```

* `@pytest.fixture` creates reusable data/setup.
* Test functions can **receive fixture names as arguments**.

---

## **6. Parametrized tests**

You can test multiple inputs with one function:

```python
import pytest

@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (0, 4, 4),
    (-1, 1, 0)
])
def test_add(a, b, expected):
    assert a + b == expected
```

* This will run the test **three times** with different values.

---

## **7. Running specific tests**

* Run a single test file:

```bash
pytest test_sample.py
```

* Run a specific test function:

```bash
pytest test_sample.py::test_add
```

* Run with verbose output:

```bash
pytest -v
```

---

## **8. Handling exceptions**

```python
import pytest

def divide(a, b):
    return a / b

def test_divide_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)
```

* `pytest.raises` checks that an exception is raised.

---

## ✅ **Summary**

* `pytest` is easy to use for Python testing.
* Naming conventions: files start with `test_`, functions start with `test_`.
* Features: fixtures, parametrize, exception checking.
* Run tests with `pytest` in the terminal.

---

If you want, I can also make a **small real-world example with a class, methods, and fixtures**, showing a more “professional” pytest structure like in a project. It’s very handy for CV/portfolio projects.

Do you want me to do that?
