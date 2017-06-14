import React from 'react';
import DatePicker from 'react-datepicker';
import {MultiSelect} from './MultiSelect';


export const NewProjectForm = (props) => {
  return (
      <form className="newproject__form" onSubmit={props.handleSubmit}>
        <label>
          Project Name:
          <input
            name="projectName"
            type="text"
            onChange={props.handleOnChange}
            value={props.newProject.projectName} />
        </label>
        <label>
          Due Date:
          <DatePicker
            selected={props.newProject.dueDate}
            onChange={props.handleTimeChange} />
        </label>
        <label>
          Documents:
          <MultiSelect
            name={"documents"}
            selected={props.newProject.documents.requiredDocuments}
            handleMultiSelect={props.handleMultiSelect}
            options={props.documents} />
        </label>
        <label>
          Notes:
          <textarea
            name={"notes"}
            onChange={props.handleOnChange}
            value={props.newProject.notes} />
        </label>
        <label>
          Members:
          <MultiSelect
            name="members"
            selected={props.newProject.members}
            handleMultiSelect={props.handleMultiSelect}
            options={props.members} />
        </label>
        <label>
          Email Body:
          <textarea
            name="email"
            onChange={props.handleOnChange}
            value={props.newProject.email} />
        </label>
        <input
          className="save__btn"
          type="submit"
          value="Save & Track" />
      </form>
  );
}
