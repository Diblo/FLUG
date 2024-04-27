# Manual Test Redux Toolkit:

## JavaScript Example:

Create the `test.js` file in the folder: `<path/to/the/flug-project/folder>/frontend/web/src/rtk` with the content.

```javascript
import store from "./store"
import { listUsers } from "./usersSlice"

store.subscribe(() => {
  const states = store.getState()

  // Adjust this based on the state of the reducer
  // to which your action belongs.
  // Example: states.users, states.blogs, etc.
  console.log(states.users)

  // Alternatively, print all states.
  // console.log(states)
})

// Adjust the action you wish to test.
store.dispatch(listUsers())
```

**Command Prompt:**

```shell
cd <path/to/the/flug-project/folder>/frontend/web/src/rtk
node --es-module-specifier-resolution=node ./test
```

## React Native Web Example:

Create the following files in the folder: `<path/to/the/flug-project/folder>/frontend/web/src/rtk`.

**Test Runner:**

`test-runner.html` is used to initialize the React Native Web environment. Although it is not an example, it can be modified.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test Runner</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import React from "react"
      import { createRoot } from "react-dom/client"

      import { Provider } from "react-redux"
      import store from "./store"

      import { ToastProvider } from "react-native-toast-notifications"

      import TestComponent from "./TestComponent"

      function App() {
        return (
          <Provider store={store}>
            <ToastProvider>
              <TestComponent />
            </ToastProvider>
          </Provider>
        )
      }

      const root = createRoot(document.getElementById("root"))
      root.render(<App />)
    </script>
  </body>
</html>
```

**Test Component:**

`TestComponent.js` is an example of a component for testing purposes.

```javascript
// TestComponent.js
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import { useUsersSelector } from "./store"
import { listUsers } from "./usersSlice"

export default function TestComponent() {
  const dispatch = useDispatch()
  const usersState = useUsersSelector()

  function loadNextPage() {
    dispatch(listUsers({ page: usersState.pagination.next }))
  }

  useEffect(() => {
    dispatch(listUsers())
  }, [])

  return (
    <>
      {(usersState.loading && usersState.page.allPageNums.length === 0 && (
        <div>Loading...</div>
      )) || (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {usersState.page.allPageNums.flatMap((pageNum) =>
              usersState.page.byPageNum[pageNum].flatMap((user) => (
                <React.Fragment key={user.id}>
                  <div>{user.firstName}</div>
                  <div>{user.lastName}</div>
                  <div>{user.email}</div>
                </React.Fragment>
              )),
            )}
          </div>
          {usersState.pagination.self !== usersState.pagination.last && (
            <button onClick={loadNextPage}>Next Page</button>
          )}
        </>
      )}
    </>
  )
}
```

**Command Prompt:**

```shell
cd <path/to/the/flug-project/folder>/frontend/web
npx parcel ./src/rtk/test-runner.html --open
# or without opening the web browser
npx parcel ./src/rtk/test-runner.html
```

**NOTE:** The web URL can be seen in the printout from Parcel.
