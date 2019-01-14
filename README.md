# `react-devcloud-components`

## Components
###Authenticator
This component will handle the complete sign in -, challenges -, reset password - and reset Account processes. It also sets tokens in your devcloud-client-lib.
```js
<Authenticator
    onAuthenticated={() => {
      doSomething()
    }}
/>
```

###Block
A block element with subheading. Can be used as a paper element.
```js
<Block label="Some" primary>
    Hallo
</Block>
```
###Form
A unified Form interface.
```js
const actions = (formActions) => {
  return (<button onClick={async e => {
    formActions.togglePending();
    await doStuff();
    formActions.togglePending();
  }}>Submit</button>)
}
return (<Form actions={actions}>
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
        </Form>)
```
###Layouter
Sets the basic layout of the current page. You can choose from a preset of layouts.
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
  />
```

###Router
A simple routing component, works best with redux.
```js
<Router 
    groups={["public"]} 
    pages={[{
       name: "Login",
       component: Authenticator,
       display: false,
       group: "public",
       path: "/login",
       aliasPath: ["/"],
     }, {
       name: "Browser",
       component: Browser,
       group: "private",
       path:"/browser"
     }]}/>;

```
