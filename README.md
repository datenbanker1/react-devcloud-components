# `react-devcloud-components`

## Components

All components require redux so make sure you wrap a Provider component aound your App.

```js
<Provider store={Store}>
  <App />
</Provider>
```

###Authenticator
This component will handle the complete sign in -, challenges -, reset password - and reset Account processes. It also sets tokens in your devcloud-client-lib.

> ######Redux flags
> **_signIn_**

```js
<Authenticator on={{ signIn: "AUTHENTICATOR::SIGN_IN" }} />
```

###Block
A block element with subheading. Can be used as a paper element.

```js
<Block label="Some" primary>
  Hallo
</Block>
```

###Browser
A simple wrapper with pagination and sorting for data which is not displayed in a table. If you are setting currentPage you are toggling controlled mode (vizeversa for recordsPerPage), then you will have to set onCurrentPageChange (or onRecordsPerPageChange) too.

```js
<Browser
  items={elements}
  element={item => {
    return (
      <div key={item.name}>
        {item.name}, Potential: {item.potential}
      </div>
    );
  }}
  recordsPerPageOptions={[1, 2, 3, 4, 5]}
  filter={element => element}
  sort={{
    function: (a, b, selected) => {
      const { active, order } = selected;
      switch (active) {
        case "Name":
          if (order === "asc")
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          else return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
        case "Potential":
          if (order === "asc")
            return a.potential < b.potential
              ? -1
              : a.potential > b.potential
              ? 1
              : 0;
          else
            return a.potential < b.potential
              ? 1
              : a.potential > b.potential
              ? -1
              : 0;
        default:
          return 0;
      }
    },
    options: ["Name", "Potential"]
  }}
/>
```

###Form
A unified Form interface.

```js
const actions = formActions => {
  return (
    <button
      onClick={async e => {
        formActions.togglePending();
        await doStuff();
        formActions.togglePending();
      }}
    >
      Submit
    </button>
  );
};
return (
  <Form actions={actions}>
    <Text
      xs={12}
      sm={6}
      label="Text"
      value={this.state.values.text}
      readOnly={this.state.readOnly}
      onChange={value => {
        let newState = { ...this.state };
        newState.values.text = value;
        this.setState(newState);
      }}
      error={this.state.errors.text}
    />
    <Date
      xs={12}
      sm={6}
      label="Date"
      value={this.state.values.date}
      readOnly={this.state.readOnly}
      onChange={value => {
        let newState = { ...this.state };
        newState.values.date = value;
        this.setState(newState);
      }}
      error={this.state.errors.date}
    />
    <MultiSelect
      xs={12}
      sm={6}
      label="Multiselect"
      options={["option 1", "option 2"]}
      value={this.state.values.multiSelect}
      readOnly={this.state.readOnly}
      onChange={value => {
        console.log(value);
        let newState = { ...this.state };
        newState.values.multiSelect = value;
        this.setState(newState);
      }}
      error={this.state.errors.radio}
    />
    <Select
      xs={12}
      sm={6}
      label="Select"
      options={["option 1", "option 2"]}
      value={this.state.values.select}
      readOnly={this.state.readOnly}
      onChange={value => {
        console.log(value);
        let newState = { ...this.state };
        newState.values.select = value;
        this.setState(newState);
      }}
      error={this.state.errors.radio}
    />
    <Time
      xs={12}
      sm={6}
      label="Start"
      value={this.state.values.time}
      readOnly={this.state.readOnly}
      onChange={value => {
        console.log(value);
        let newState = { ...this.state };
        newState.values.time = value;
        this.setState(newState);
      }}
      error={this.state.errors.time}
    />
    <Range
      xs={12}
      sm={6}
      label="Range"
      options={["option 1", "option 2"]}
      value={this.state.values.range}
      readOnly={this.state.readOnly}
      min={0}
      max={10}
      step={1}
      onChange={value => {
        let newState = { ...this.state };
        newState.values.range = value;
        this.setState(newState);
      }}
      error={this.state.errors.range}
    />
    <Radio
      xs={12}
      sm={6}
      label="Text"
      options={[
        { value: "radio 1", label: "option 1" },
        { value: "radio 2", label: "option 2" }
      ]}
      value={this.state.values.radio}
      readOnly={this.state.readOnly}
      onChange={value => {
        console.log(value);
        let newState = { ...this.state };
        newState.values.radio = value;
        this.setState(newState);
      }}
      error={this.state.errors.radio}
    />
    <Chips
      xs={12}
      primary
      options={[
        { label: "test1", value: "some1" },
        { label: "test2", value: "some2" }
      ]}
      readOnly={this.state.readOnly}
      value={pending ? [] : this.state.values.chips}
      onChange={values => {
        console.log(values);
        let newState = { ...this.state };
        newState.values.chips = values;
        this.setState(newState);
      }}
      pending={false}
      select={{ xs: 12, sm: 6, lg: 2 }}
    />
  </Form>
);
```

###Layouter
Sets the basic layout of the current page. You can choose from a preset of layouts.

> ######Redux flags
> **_contentLoaded, signOut_**

```js
<Layouter
  layout="admin"
  page="Page Title"
  links={[
    {
      path: "/some/path",
      name: "Link 1",
      icon: ""
    }
  ]}
  routing={false}
  on={{
    contentLoaded: "LAYOUTER::CONTENT_LOADED",
    signOut: "LAYOUTER::SIGN_OUT"
  }}
/>
```

###Router
A simple routing component. You can lazy load components if you set component a function.

> ######Redux flags
> **_none_**

```js
<Router
  groups={["public"]}
  on={{}}
  layouter={{}}
  pages={[
    {
      name: "Login",
      icon: faSignInAlt,
      layout: "emptyPage",
      component: () => {
        //lazy load component
        return import("../views/Authenticator");
      },
      inMenu: false,
      props: { label: "page 1", primary: true },
      display: false,
      group: "public",
      path: "/login",
      aliasPath: ["/"]
    },
    {
      name: "Forms",
      icon: faEdit,
      layout: "admin",
      component: Form, //load simple react component
      props: { label: "page 2", primary: true },
      group: "private",
      path: "/forms"
    }
  ]}
/>
```
