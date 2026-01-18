Common downsides of Cucumber include:

**Performance overhead** - The extra abstraction layer (Gherkin → step definitions → actual code) adds execution time compared to direct test code.

**Maintenance burden** - You maintain two things: feature files AND step definitions. Changes often require updates in both places.

**Step definition reusability issues** - Creating truly reusable steps is difficult. Teams often end up with either too-generic steps (hard to read) or too-specific steps (lots of duplication).

**Learning curve** - Non-technical stakeholders rarely write scenarios despite that being a key selling point. Developers must learn both Gherkin syntax and the step definition framework.

**Debugging complexity** - Harder to debug than regular code. Stack traces go through the Cucumber layer, making it less obvious where failures occur.

**False abstraction** - Gherkin can become "code in English" where steps are just thin wrappers around implementation, providing little actual business value while adding complexity.

**Slow test execution** - Parsing feature files and matching regex patterns for each step adds overhead, especially in large test suites.

**Tooling limitations** - IDE support, refactoring, and autocomplete are generally weaker compared to writing tests directly in code.

Many teams find that Cucumber works best when there's genuine collaboration with non-technical stakeholders who actively contribute to scenarios. Otherwise, the overhead may outweigh the benefits.