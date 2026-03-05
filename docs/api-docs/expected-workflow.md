---
sidebar_position: 2
id: Mobile API Workflow
---

<div class="center">
<p class="samplePreface">This is an introductory chapter from a guide describing several possible expected workflows enabled by a small, HTTP web service API. The content below makes reference to other, excluded sections of the larger document from which this sample was excerpted.</p>
</div>
<hr />

# 1.3 Expected API Workflow

The MobileProduct API may be used to develop 3rd party application according to each customer's particular needs, but was built with the intent of supporting the following expected workflows:

- [1.3.1 Form Assistant app](#131-form-assistant-app)
- [1.3.2 Task Processing app](#132-task-processing-app)
- [1.3.3 Timesheet Management app](#133-timesheet-management-app)

## 1.3.1 Form Assistant app

In this workflow, a 3rd party "Form Assistant" app runs alongside the MobileProduct app on the same mobile device (phone or tablet) and exchanges data to assist in filling out a MobileProduct form. At a high level, the standard expected workflow envisions a MobileProduct user beginning to fill out a task's Collect Data form; launching the Form Assistant app via custom URL that includes the Collect Data form's populated fields; using the Form Assistant app to perform supplemental work based on this data; and then returning to the MobileProduct app via custom URL that includes additional form data to be applied to the original Collect Data form.

The following steps outline the expected Form Assistant app workflow in detail:

1. From the **MobileProduct** app, a user fills out several fields in a task's **Collect Data** form.

2. While viewing the Collect Data form, a user taps an **Assistant** button.

    The MobileProduct app launches the **3rd party** app via pre-configured URL scheme, supplying the app with the task's unique identifier, the form instance's unique identifier, the task's position coordinates, and key/value pairs for every populated field in the form. For more information, see section <u>2.1.1 Collect Data Launch URLs</u>.

3. The **3rd party** app uses the supplied form data to perform supplemental work.

4. The **3rd party** app launches the **MobileProduct** app via pre-configured URL scheme, supplying the app with key/value pairs for one or more of the form's fields.

    The MobileProduct app opens to the last displayed interface and applies the supplied field data to the same **Collect Data** form from which the 3rd party app was originally launched, if still available. For more information, see section <u>2.2 Launching the MobileProduct app</u>.

## 1.3.2 Task Processing app

In this workflow, a 3rd party "Task Processing" app runs alongside the MobileProduct app on the same mobile device (phone or tablet) and receives task data to enable supplemental task processing actions. At a high level, the standard expected workflow envisions a MobileProduct user launching the Task Processing app via custom URL upon either certain task state transitions or manual button press; the Task Processing app using HTTP requests to perform some supplemental work related to a task; and then returning to the MobileProduct app via hard-coded URL scheme.

This workflow uses HTTP requests described in the following OpenAPI document included in the **MobileProductAPI.zip** package referenced in section *1.4 Artifacts*:

<p class="code">TaskProcSwagger.json</p>

The following steps outline the expected Task Processing app workflow in detail:

1. From the **MobileProduct** app, a user does one of the following:

    - User transitions a task to the **En Route** or **On Site** state.
    
        The MobileProduct app launches the **3rd party** app via pre-configured URL scheme, supplying the app with the transitioned task’s unique identifier, state, and position coordinates. For more information, see section <u>2.1.2 State Transition URLs</u>.

    - While viewing a task in the **On Site** state, a user taps an **External** button.

        The MobileProduct app launches the **3rd party** app via pre-configured URL scheme, supplying the app with the task’s unique identifier, state, and position coordinates. For more information, see section <u>2.1.3 Task Launch URLs</u>.

2. The **3rd party** app uses any of the following HTTP requests to **retrieve** information from the MainProduct server:

        :::note
        For more information about any of the HTTP requests listed below, see <u>3 MobileProduct API HTTP Requests</u>.
        :::

    - `GET /tasks/{tasknum}/details` - Returns detailed information about a specified task and its associated activities.

    - `GET /employees/{empid}` - Returns detailed information about a specified user.

    - `GET /employees/{empid}/tasks` - Returns a list of the tasks currently assigned to a specified user.

3. The **3rd party** app uses any of the following HTTP requests to **send** information back to the MainProduct server:

    - `PUT /tasks/{tasknum}/collect` - Either submits a Collect Data form for a specified task, completes a specified task, or both at once.

    - `POST /main/request` - Submits an information request form.

4. The **3rd party** app launches the MobileProduct app using the following URL scheme:

    <p class="indent1">`thismobileproduct://`</p>

    The MobileProduct opens to the interface from which the 3rd party app was originally launched, if still available. For more information, see section <u>2.2 Launching the MobileProduct App</u>.

## 1.3.3 Timesheet Management app

In this workflow, a 3rd party "Timesheet Management" app retrieves timesheet data entered by MobileProduct app users to track their time spent on various events. The Timesheet Management app is not required to run on the same mobile device as the MobileProduct app. At a high level, the standard expected workflow envisions a MobileProduct user submitting one or more timesheets throughout their day; a supervisor using the Timesheet Management app to retrieve a list of the MobileProduct user's timesheets; and then that same supervisor using the Timesheet Management app to approve or deny a particular timesheet.

This workflow uses HTTP requests described in the following OpenAPI document included in the **MobileProductAPI.zip** package referenced in section *1.4 Artifacts*:

<p class="code">TimesheetSwagger.json</p>

The following steps outline the expected Timesheet Management app workflow in detail:

:::note
For more information about any of the HTTP requests listed below, see <u>3 MobileProduct API HTTP Requests</u>.
:::

1. From the **MobileProduct** app, a user creates and submits one or more timesheets to the MainProduct server.

2. The **3rd party** app uses the following HTTP request to **retrieve** a list of timesheets submitted by a particular user within a specified timeframe:

    <p class="indent1">`GET /employees/timesheets/{empid}/{startDateTime}/{endDateTime}`</p>

    The server responds with details about every timesheet submitted by the indicated user within the specified timeframe.

3. The 3rd party app sends the following REST operation to either approve or deny a specified timesheet:

    <p class="indent1">`POST /employees/timesheets/{timeSheetId}/review`</p>
