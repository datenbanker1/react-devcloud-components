import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import Block from "../../components/Block";
import {
  Form,
  Text,
  Radio,
  Range,
  Date,
  MultiSelect,
  Select,
  Time
} from "../../components/Form";

class FormWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: false,
      disable: false,
      pending: true,
      values: {
        text: "Hallo ich bin ein Textfeld",
        radio: "",
        date: "",
        multiSelect: [],
        select: "",
        range: [5],
        ranger: [0, 2, 10],
        time: "",
        textField: ""
      },
      errors: {
        text: false,
        radio: false,
        date: false,
        multiSelect: false,
        select: false
      }
    };
  }
  render() {
    const { pending } = this.state;
    const actions = formActions => (
      <Grid container direction="row" justify="flex-end">
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            style={{ marginRight: "8px" }}
            color="default"
            onClick={e => {
              e.preventDefault();
              let newState = { ...this.state, disable: !this.state.disable };
              this.setState(newState);
            }}
          >
            disable
          </Button>
          <Button
            variant="contained"
            style={{ marginRight: "8px" }}
            color="default"
            onClick={e => {
              e.preventDefault();
              let newState = { ...this.state, readOnly: !this.state.readOnly };
              this.setState(newState);
            }}
          >
            read only
          </Button>
          <Button
            variant="contained"
            style={{ marginRight: "8px" }}
            color="default"
            onClick={e => {
              e.preventDefault();
              let newState = { ...this.state };
              newState.errors.text = this.state.errors.text
                ? false
                : "An error occurred...";
              newState.errors.radio = this.state.errors.radio
                ? false
                : "An error occurred...";
              newState.errors.multiSelect = this.state.errors.multiSelect
                ? false
                : "An error occurred...";
              newState.errors.range = this.state.errors.range
                ? false
                : "An error occurred...";
              newState.errors.date = this.state.errors.date
                ? false
                : "An error occurred...";
              newState.errors.select = this.state.errors.select
                ? false
                : "An error occurred...";
              newState.errors.time = this.state.errors.time
                ? false
                : "An error occurred...";
              this.setState(newState);
            }}
          >
            error
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              e.preventDefault();
              formActions.togglePending();
              setTimeout(() => {
                formActions.togglePending();
              }, 5000);
            }}
          >
            pending
          </Button>
        </Grid>
      </Grid>
    );
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} lg={6}>
          <Block label="Statisch" head={{ primary: false }}>
            <Form actions={actions} pendingContent={pending}>
              <Text
                xs={12}
                sm={6}
                label="Text"
                instant
                value={pending ? "" : this.state.values.text}
                readOnly={this.state.readOnly}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.text = value;
                  this.setState(newState);
                }}
                error={this.state.errors.text}
                disabled={this.state.disable}
              />
              <Text
                xs={12}
                sm={6}
                label="Text Strict"
                strict
                value={pending ? "" : this.state.values.text}
                readOnly={this.state.readOnly}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.text = value;
                  this.setState(newState);
                }}
                error={this.state.errors.text}
                disabled={this.state.disable}
              />
              <Text
                xs={12}
                sm={6}
                label="Changer 4 readOnly"
                value={pending ? "" : this.state.values.text}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.text = value;
                  this.setState(newState);
                }}
                error={this.state.errors.text}
                disabled={this.state.disable}
              />
              <Date
                xs={12}
                sm={6}
                label="Date"
                value={pending ? "" : this.state.values.date}
                readOnly={this.state.readOnly}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.date = value;
                  this.setState(newState);
                }}
                error={this.state.errors.date}
                disabled={this.state.disable}
              />
              <Text
                xs={12}
                label="Textfeld"
                rows={5}
                value={pending ? "" : this.state.values.textField}
                readOnly={this.state.readOnly}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.textField = value;
                  this.setState(newState);
                }}
                error={this.state.errors.text}
                disabled={this.state.disable}
              />
              <MultiSelect
                xs={12}
                sm={6}
                label="Multiselect"
                options={[
                  { label: "option1", value: "value1" },
                  { label: "option2", value: "value2" }
                ]}
                value={pending ? [] : this.state.values.multiSelect}
                readOnly={this.state.readOnly}
                onChange={value => {
                  console.log(value);
                  let newState = { ...this.state };
                  newState.values.multiSelect = value;
                  this.setState(newState);
                }}
                error={this.state.errors.radio}
                disabled={this.state.disable}
              />
              <Select
                xs={12}
                sm={6}
                label="Select"
                options={["option 1", "option 2"]}
                value={pending ? "" : this.state.values.select}
                readOnly={this.state.readOnly}
                onChange={value => {
                  console.log(value);
                  let newState = { ...this.state };
                  newState.values.select = value;
                  this.setState(newState);
                }}
                error={this.state.errors.radio}
                disabled={this.state.disable}
              />
              <Time
                xs={12}
                sm={6}
                label="Time"
                value={pending ? "" : this.state.values.time}
                readOnly={this.state.readOnly}
                onChange={value => {
                  console.log(value);
                  let newState = { ...this.state };
                  newState.values.time = value;
                  this.setState(newState);
                }}
                error={this.state.errors.time}
                disabled={this.state.disable}
              />
              <Range
                xs={12}
                sm={6}
                label="Range"
                value={pending ? [0] : this.state.values.range}
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
                disabled={this.state.disable}
              />
              <Range
                xs={12}
                sm={6}
                label="Range"
                value={pending ? [0, 0, 0] : this.state.values.ranger}
                readOnly={this.state.readOnly}
                min={0}
                max={10}
                step={1}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.ranger = value;
                  this.setState(newState);
                }}
                error={this.state.errors.range}
                disabled={this.state.disable}
              />
              <Radio
                xs={12}
                sm={6}
                label="Text"
                options={[
                  { value: "radio 1", label: "option 1" },
                  { value: "radio 2", label: "option 2" }
                ]}
                value={pending ? "" : this.state.values.radio}
                readOnly={this.state.readOnly}
                onChange={value => {
                  console.log(value);
                  let newState = { ...this.state };
                  newState.values.radio = value;
                  this.setState(newState);
                }}
                error={this.state.errors.radio}
                disabled={this.state.disable}
              />
            </Form>
          </Block>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ marginRight: "8px" }}
            color="default"
            onClick={e => {
              e.preventDefault();
              let newState = { ...this.state, pending: !this.state.pending };
              this.setState(newState);
            }}
          >
            pending content
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default FormWrapper;
