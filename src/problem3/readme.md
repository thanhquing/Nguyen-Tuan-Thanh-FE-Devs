## Issues and Inefficiencies

- The sorting operation in `useMemo` is performed every time `balances` or `prices` change, leading to unnecessary computations if `prices` aren’t relevant to the sorting.

- The filtering logic in `sortedBalances` checks `balance.amount <= 0` only after evaluating `balancePriority`. This could be simplified.

- The `formattedBalances` array is created but never used. It adds unnecessary overhead.

- Using `index` as a key in the `WalletRow` components can lead to performance issues and incorrect behavior when the list changes, as keys should be unique and stable.

- The `getPriority` function uses a `switch` statement, which is fine, but could be optimized using a map for better readability and performance.

- The `blockchain` parameter in `getPriority` is of type `any`. This should be more strictly typed to enhance type safety.
- Variables like `lhs` and `rhs` in the sorting function are not descriptive, making the code harder to read.

## Improvements Made

- Eliminated `formattedBalances` as it was unused.
- Combined the filtering conditions into a single return statement.
- Used a combination of `currency` and `index` for unique keys in `WalletRow`.
- Simplified priority retrieval by using an object instead of a switch statement.
- Improved variable names and structure for clarity and maintainability.
- Explicitly typed the `blockchain` parameter in `getPriority`.


## Refactored version: WalletPageV1 folder


## Refactored version V2: Based on my experiences what i faced in the past =_= WalletPageV2 folder. The benefit of separating
1. Improved Reusability:

- The WalletPageV2View component solely handles the presentation logic (the View). It can be reused across different parts of your application wherever you need to display a list of formatted wallet balances. This reduces code duplication and promotes maintainability.
2. Enhanced Testability:

- The View component is simpler and easier to test in isolation. You can mock the data (sortedBalances and prices) and verify that the component renders the expected output.
3. Clearer Separation of Concerns:

- The WalletPage component (Container) manages the data fetching and processing logic. It retrieves data from hooks like useWalletBalances and usePrices, calculates priorities using getPriority, and prepares the filtered and sorted data for the View. This separation keeps concerns distinct and makes the code easier to reason about.
4. Flexibility and Potential for State Management:

- While this example doesn't utilize state management directly, separating View and Container allows for flexibility in the future. If you need to manage complex state related to the wallet balances or implement additional features, the Container can handle those interactions without affecting the View's presentation logic.
5. Maintainability and Code Readability:

- Separating View and Container improves code readability. The View focuses solely on how things are displayed, while the Container manages data and logic. This separation makes the code easier to understand and maintain over time, especially as the application grows.