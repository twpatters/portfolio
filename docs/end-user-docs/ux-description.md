---
sidebar_position: 2
id: UX Descriptions
---

<div class="center">
    <p class="samplePreface">These topics describe UX components from a web application belonging to a SaaS solution. The content below makes reference to other, excluded sections of the much larger document from which this sample was excerpted.</p>
</div>
<hr />

# Grid Pane

The left-hand section of the Dispatch app interface always contains a grid summarizing information about one or more of your organization's work orders, tasks, or mobile users. The following topics describe each of the grids you will encounter in the Dispatch app and how to work with them:

- [Tasks Grid](#tasks-grid)

- [Work Orders Grid](#work-orders-grid)

- [Fleet Grid](#fleet-grid)

- [Customizing Grids](#customizing-grids)

## Tasks Grid

While working in the Map View, List View, or Work Order View, the left-hand section of the interface includes a *Tasks* grid, which contains read-only information about one or more of your organization's tasks. In the Map View and List View, the *Tasks* grid is always visible, whereas from the Work Order View it is nested beneath expandable sections representing your work orders. Each row in the *Tasks* grid represents a separate task.

The exact tasks that appear in the *Tasks* grid is context sensitive and varies depending on the situation. The following sections describe features common to the *Tasks* grid in all situations:

- [Tasks grid layout](#tasks-grid-layout)
- [Tasks grid columns](#tasks-grid-columns)

:::note
For guidance on using the Tasks grid in particular contexts, refer to the following topics:
<ul className="bulletGridTwoCol">
    <li><u>Working in the Map View</u></li>
    <li><u>Working in the Work Order View</u></li>
    <li><u>Working in the List View</u></li>
    <li><u>Working in Tech Details Mode</u></li>
</ul>
:::

### Tasks grid layout

<img src={require('./img_ux/interface_tasksgrid_annotated.webp').default} alt="Tasks grid interface" loading="lazy" width="850px" />

The *Tasks* grid consists of the following components:

- **Task Count:** The upper-left corner of the *Tasks* grid always displays a count of the tasks currently available in the grid. The exact tasks available from the Tasks grid at any given moment is **context sensitive** and varies according to a range of criteria, including your filter settings, your selections in the interface, and the screen or mode in which you are currently working. All portions of the task count consider only those tasks applicable to the *current* context, discounting completely any tasks that fall outside this context.

    Depending on the situation, the task count may use any of the following formats:

    - **Tasks (X of Y):** In the Map View and Work Orders View, the task count indicates the quantity of tasks currently available in the *Tasks* grid (**X**) next to the total quantity of tasks applicable to the current context (**Y**). These two numbers are usually identical, unless the current context includes more than 1000 tasks, in which case the *Tasks* grid will display only the first 1000 tasks, chosen according to your current sorting criteria.
    
        For example, if the current context includes a total of 1500 tasks, then the count will state: *Tasks (1000 of 1500)*.

    - **Tasks (X to Y of Z):** In the List View, the task count indicates current pagination by stating *which* quantity of tasks is currently listed in the *Tasks* grid (**X to Y**), out of the total quantity of tasks applicable to the current context (**Z**).

        For example, if the current context includes a total of 1500 tasks, then on the first page of tasks, the count will state: *Tasks (1 to 100 of 1500)*. Upon clicking the *Next Page* <img src={require('./img_ux/button_tasks_nextpage.png').default} alt="Next Page button" loading="lazy" /> button, the count will update to state: *Tasks (101 to 200 of 1500)*.

    - **Assigned/Eligible tasks (X):** In the Map View and List View, while working in Tech Details mode, the task count indicates the quantity of tasks listed in the *Tasks* grid (X), which depending on the currently selected tab is either the total quantity of tasks assigned to the selected mobile user (*Assigned*), or the total quantity of tasks suggested for assignment to the mobile user (*Eligible*).

- **Tasks:** Each task applicable to the current context is listed in a read-only grid, with each row representing a separate task. By default, this grid is sorted in ascending order according to the *Is Emergency*, *Earliest On Site At*, and *Task Number* task properties as primary, secondary, and tertiary criteria, with emergency tasks at the top of the list. These properties as used as default sorting criteria even if they are not currently added to the grid as columns. Most of the available columns in the *Tasks* 
grid are determined by your organization and depend on your configuration. For details about some of the most commonly used columns, see the [Tasks grid columns](#tasks-grid-columns) section below.

    In order to perform actions on any of the listed tasks, select a task by clicking the applicable grid row or map icon and then click any of the action buttons in the upper-right section of the *Tasks* grid. The *Tasks* grid always highlights the currently selected task's row in blue.

- **Selected Task Actions:** The upper-right section of the *Tasks* grid displays a number of buttons for performing actions on the currently selected task. When no task is selected, all task action buttons will be disabled. Upon selecting a task by clicking a grid row or map icon, the Dispatch app will enable each button representing an action that you can perform on the currently selected task.
    
    This section of the *Tasks* grid may display any of the following buttons:

    - <img src={require('./img_ux/button_tasks_duplicate.png').default} alt="Duplicate button" loading="lazy" /> **Duplicate:** Create a new copy of the selected task. For more information, see <u>Duplicating Tasks</u>.

    - <img src={require('./img_ux/button_tasks_cancel.png').default} alt="Cancel button" loading="lazy" /> **Cancel:** Cancel the task so that it is no longer applicable or available to be assigned to any user. For more information, see <u>Canceling Tasks</u>.

    - <img src={require('./img_ux/button_tasks_reassign.png').default} alt="Reassign button" loading="lazy" /> **Reassign:** Enabled only for tasks in the Dispatched, Unacknowledged, En Route, or On Site states, click to change the task's current mobile user assignment. For more information, see <u>Reassigning Tasks</u>.

    - <img src={require('./img_ux/button_tasks_unassign.png').default} alt="Unassign button" loading="lazy" /> **Unassign:** Enabled only for tasks in the Dispatched, Unacknowledged, En Route, or On Site states, click to remove the task's current user assignment and set the task to the Pending state. For more information, see <u>Unassigning Tasks</u>.

    - <img src={require('./img_ux/button_tasks_moreoptions.png').default} alt="More Options button" loading="lazy" /> **More Options:** Click to display a menu containing the following entries for performing additional actions on the selected task:

        - *Change business unit:* Change the business unit associated with the selected task. For more information, see <u>Changing a Task's Business Unit</u>.

    - <img src={require('./img_ux/button_tasks_assign.png').default} alt="Assign button" loading="lazy" /> **Assign:** Available only while viewing eligible tasks in Tech Details mode, assigns the selected task to the currently selected mobile user. For more information, see <u>Working in Tech Details Mode</u>.

- <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> **Column Options:** Upon hovering your cursor over a column header, a down-arrow <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Optiont" loading="lazy" /> will appear to the right of the title, which you can click to drop-down a menu containing options for customizing your view of the grid. You can use this menu to sort your tasks by a particular column, group tasks by a particular column's values, or temporarily hide or show columns. For more information, see <u>Customizing Grids</u>.

- <img src={require('./img_ux/button_tasks_unmappableclear.png').default} alt="Unmappable toggle" loading="lazy" /> **Unmappable toggle:** In the Map View only, click the *Unmappable* toggle to temporarily hide the map and refresh the *Tasks* grid to display only those tasks meeting your current filter criteria that have no defined location. While this toggle is selected <img src={require('./img_ux/button_tasks_unmappableselect10px.png').default} alt="Unmappable toggle selected" loading="lazy" />, the *Tasks* grid will switch to a paged interface like the one used in the List View. To restore the map and once again hide all tasks with no location, click the *Unmappable* toggle a second time. For more information on using the *Unmappable* toggle, see Working in the <u>Map View</u>.

- <img src={require('./img_ux/button_tasks_nextpage.png').default} alt="Next Page button" loading="lazy" /> <img src={require('./img_ux/button_tasks_prevpage.png').default} alt="Previous Page button" loading="lazy" /> **Next/Previous Page buttons:** In the List View only, if the Tasks grid currently lists more than 100 orders, navigate between pages by clicking the *Next* <img src={require('./img_ux/button_tasks_nextpage.png').default} alt="Next Page button" loading="lazy" /> and *Previous* <img src={require('./img_ux/button_tasks_prevpage.png').default} alt="Previous Page button" loading="lazy" /> buttons in the upper-right corner of the *Tasks* grid. For more information, see <u>Working in the List View</u>.

- **Assigned/Eligible tabs:** In the Map View and List View, upon selecting a mobile user from the *Techs* card list, the interface switches to Tech Details mode. When working in Tech Details mode, click the *Assigned* or *Eligible* tabs that appear in the upper-left corner of the *Tasks* grid to display only those tasks that are either currently assigned or suggested for assignment to the selected mobile user. For more information, see <u>Working in Tech Details Mode</u>.

### Tasks grid columns

Most of the available columns in the *Tasks* grid are determined by your organization and depend on your configuration, but the following are some of the most commonly used. The exact column headings may differ in your interface:

- **ETA:** In the Map View, when working in the *Eligible* tab of Tech Details mode, the *Tasks* grid will display an *ETA* column at the far left of the grid. This column displays an estimate of the total driving time from the selected mobile user to each of the listed tasks suggested for assignment. This estimate is determined by an internal routing engine that takes into account the mobile user's last reported position, optimal street routing, and current traffic conditions. This column never appears in the List 
View or Work Order View. For more information on Tech details mode, see <u>Working in Tech Details Mode</u>.

- **Is Emergency:** In the *Is Emergency* column, a red square <img src={require('./img_ux/icon_tasks_isemerg.png').default} alt="Emergency Task icon" loading="lazy" /> indicates an emergency task and a blue square <img src={require('./img_ux/icon_tasks_isreg.png').default} alt="Regular Task icon" loading="lazy" /> indicates a regular priority task.

- **Task State:** The *Task State* column displays one of the following icons indicating each task's current
state:

    - <img src={require('./img_ux/icon_tasks_pending.png').default} alt="Pending Task icon" loading="lazy" /> Pending

    - <img src={require('./img_ux/icon_tasks_unacknowledged.png').default} alt="Unacknowledged Task icon" loading="lazy" /> Unacknowledged

    - <img src={require('./img_ux/icon_tasks_dispatched.png').default} alt="Dispatched Task icon" loading="lazy" /> Dispatched

    - <img src={require('./img_ux/icon_tasks_enroute.png').default} alt="En Route Task icon" loading="lazy" /> En Route

    - <img src={require('./img_ux/icon_tasks_onsite.png').default} alt="On Site Task icon" loading="lazy" /> On Site

    - <img src={require('./img_ux/icon_tasks_completed.png').default} alt="Completed Task icon" loading="lazy" /> Completed

    - <img src={require('./img_ux/icon_tasks_canceled.png').default} alt="Canceled Task icon" loading="lazy" /> Canceled

- **Task Number:** The task's unique identifier within PRODUCT. No two tasks will ever have the same task number.

- **Same Site Key:** A string of text used to identify the task as being co-located at the exact same worksite as any other task sharing that same site key. If a task has no same site key, this field is blank. 

- **Is Job On:** An indication of whether the task's assigned mobile user is currently tracking Job On time for the task. A check mark indicates that Job On tracking is currently toggled on, whereas an X indicates that Job On tracking is currently toggled off.

- **Total JobOn Time:** The total duration of Job On time tracked for the task in seconds. This count includes all times that Job On tracking has been started and stopped for this task by any user.

- **Total Time On Site:** The duration of time that the task has spent in the On Site state with its current or last assigned user. This count includes all times that this user has transitioned the task to the On Site state, but resets upon reassigning the task to another user. The count is retained if the task is completed, canceled, or set back to the *Pending* state.

- **Current Assigned Mobile User Id:** The User ID of the mobile user to whom the task is currently assigned. If the task is not currently assigned to any user, this field is blank.

- **Priority:** The task's priority. Your organization can define its own ranking system for priorities, but every priority is always classified as either *emergency* or *regular*. 

- **Earliest On Site At:** The start of the task's appointment window. 

- **Latest On Site At:** The end of the task's appointment window.

For information about any of the task properties described above, see <u>Dispatch Concepts</u>.
<hr />

## Work Orders Grid

While working in the Work Order View, the left-hand section of the interface contains a *Work orders* grid, which contains expandable sections representing your organization's work orders. Each expandable section represents a separate work order. You can expand any work order section in the grid to display a nested *Tasks* grid listing each of the tasks belonging to that work order. The *Work orders* grid displays one expandable section for each work order that meets the filter criteria defined for the Dispatch app window. Within each work order grouping, the Tasks grid is not filtered at all. For more information on defining filter criteria, see <u>Display Filters</u>.

The following sections describe the components of the Work orders grid:

- [Work orders grid layout](#work-orders-grid-layout)

- [Work orders grid columns](#work-orders-grid-columns)

:::note
For guidance on using the Work orders grid to accomplish specific functions, see <u>Working in the Work Order View</u>.
:::

### Work orders grid layout

<img src={require('./img_ux/interface_workordersgrid_annotated.webp').default} alt="Work orders grid interface" loading="lazy" width="850px" />

The *Work orders* grid consists of the following components:

- **Work Order Count (X to Y of Z):** The upper-left corner of the *Work orders* grid always displays a count of the work orders currently listed in the grid using the format: **(X to Y of Z)**. This count indicates current pagination by stating *which* quantity of work orders is currently listed in the *Work orders* grid (**X to Y**), out of the total quantity of work orders that meet your current filter criteria (**Z**).

    For example, if your filter criteria includes a total of 1500 work orders, then on the first page of work orders, the count will state: *Work orders (1 to 100 of 1500)*. Upon clicking the *Next Page* <img src={require('./img_ux/button_tasks_nextpage.png').default} alt="Next Page button" loading="lazy" /> button, the count will update to state: *Work orders (101 to 200 of 1500)*.

- **Work orders:** Each work order that meets your current filter criteria is listed in a read-only grid as an expandable section. Click the **plus** icon <img src={require('./img_ux/button_workorderview_expand.png').default} alt="Work Orders Expand button" loading="lazy" /> at the far left of any section to display a nested **Tasks** grid listing each of the tasks belonging to that work order. Apart from work order association, these nested *Tasks* grid are never filtered in any way. If a work order has more than 1000 tasks, its *Tasks* grid will display only the first 1000 tasks, chosen according to your current sorting criteria. In all other respects, the *Tasks* grid behaves exactly the same as in other Dispatch app interfaces. For more information on using the *Tasks* grid, see [Tasks Grid](#tasks-grid).

    The top level *Work orders* grid itself exists primarily to group your tasks and does not enable any direct interaction with your work orders. However, it behaves much like other grids in the Dispatch app in that it displays read-only information about each of your work orders and you can customize its default display settings as needed. Most of the available columns in the *Work orders* grid are determined by your organization and depend on your configuration. For details about some of the most commonly used columns, see the [Work orders grid columns](#work-orders-grid-columns) section below.

 - <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> **Column Options:** Upon hovering your cursor over a *Work orders* grid column header, a down-arrow <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> will appear to the right of the title, which you can click to drop-down a menu containing options for customizing your view of the grid. You can use this menu to sort your work orders by a particular column, group work orders by a particular column's values, or temporarily hide or show columns. For more information, see [Customizing Grids](#customizing-grids).
 
 - <img src={require('./img_ux/button_tasks_nextpage.png').default} alt="Next Page button" loading="lazy" /> <img src={require('./img_ux/button_tasks_prevpage.png').default} alt="Previous Page button" loading="lazy" /> **Next/Previous Page buttons:** If the *Work orders* grid currently lists more than 100 work orders, navigate between pages by clicking the *Next* <img src={require('./img_ux/button_tasks_nextpage.png').default} alt="Next Page button" loading="lazy" /> and *Previous* <img src={require('./img_ux/button_tasks_prevpage.png').default} alt="Previous Page button" loading="lazy" /> buttons in the upper-right corner of the *Work orders* grid.

### Work orders grid columns

Most of the available columns in the *Work orders* grid are determined by your organization and depend on your configuration, but the following are some of the most commonly used. The exact column headings may differ in your interface:

- **Expand/Collapse:** The far left column of the *Work orders* grid always contains a plus/minus (<img src={require('./img_ux/button_workorderview_expand.png').default} alt="Work Orders Expand button" loading="lazy" />/<img src={require('./img_ux/button_workorderview_collapse.png').default} alt="Work Orders Collapse button" loading="lazy" />) toggle you can click to expand or collapse each work order section. You cannot hide, move, or resize this column.

- **Work Order Number:** The work order's unique identifier within PRODUCT. No two work orders will ever have the same work order number.

<hr />

## Fleet Grid

While working in the Fleet View, the left-hand section of the interface contains a *Fleet* grid, which contains read-only information about one or more of your organization's mobile users. Each row in the *Fleet* grid represents a separate mobile user. The *Fleet* grid displays one row for each mobile user that meets the filter criteria defined for the Dispatch app window. For more information on defining filter criteria, see <u>Display Filters</u>.

The following sections describe the components of the *Fleet* grid:

- [Fleet grid layout](#fleet-grid-layout)

- [Fleet grid columns](#fleet-grid-columns)

### Fleet grid layout

<img src={require('./img_ux/interface_fleetgrid_annotated.webp').default} alt="Fleet grid interface" loading="lazy" width="850px" />

The *Fleet* grid consists of the following components

- **Mobile User Count (X to Y of Z):** The upper-left corner of the *Fleet* grid always displays a count of the mobile users currently listed in the grid using the format: **(X to Y of Z)**. This count indicates current pagination by stating *which* quantity of users is currently listed in the *Fleet* grid (**X to Y**), out of the total quantity of users that meet your current filter criteria (**Z**).

    For example, if your filter criteria includes a total of 1500 mobile users, then on the first page of users, the count will state: *Fleet (1 to 100 of 1500)*. Upon clicking the *Next Page* <img src={require('./img_ux/button_tasks_nextpage.png').default} alt="Next Page button" loading="lazy" /> button, the count will update to state: *Fleet (101 to 200 of 1500)*.

- **Mobile Users:** Each mobile users that meets your current filter criteria is listed in a read-only grid, with each row representing a separate user. By default, this grid is sorted in ascending alpha-numeric order according to the *User Id* property. This property is used as default sorting criteria even if it is not currently added to the grid as a column. Most of the available columns in the *Fleet* grid are determined by your organization and depend on your configuration. For details about some of the most commonly used columns, see the [Fleet grid columns](#fleet-grid-columns) section below.

    To view a list of tasks related to any of the listed mobile users, select a user by clicking the applicable grid row and a **Tasks** card list will expand to the right of the grid. The *Tasks* card list is divided into *Assigned* and *Eligible* tabs, which you can click to toggle between displaying only those tasks that are either currently assigned to the selected user or are suggested for assignment to the selected user. The *Fleet* grid always highlights the currently selected user's row in blue. For more information on using the *Tasks* card list, see <u>Tasks Card List</u>.

- <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> **Column Options:** Upon hovering your cursor over a *Fleet* grid column header, a down-arrow <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> will appear to the right of the title, which you can click to drop-down a menu containing options for customizing your view of the grid. You can use this menu to sort your mobile users by a particular column, group users by a particular column's values, or temporarily hide or show columns. For more information, see [Customizing Grids](#customizing-grids).

 - <img src={require('./img_ux/button_tasks_nextpage.png').default} alt="Next Page button" loading="lazy" /> <img src={require('./img_ux/button_tasks_prevpage.png').default} alt="Previous Page button" loading="lazy" /> **Next/Previous Page buttons:** If the *Fleet* grid currently lists more than 100 mobile users, navigate between pages by clicking the *Next* <img src={require('./img_ux/button_tasks_nextpage.png').default} alt="Next Page button" loading="lazy" /> and *Previous* <img src={require('./img_ux/button_tasks_prevpage.png').default} alt="Previous Page button" loading="lazy" /> buttons in the upper-right corner of the *Fleet* grid.

### Fleet grid columns

Most of the available columns in the *Fleet* grid are determined by your organization and depend on your configuration, but the following are some of the most commonly used. The exact column headings may differ in your interface:

- **Emergency Condition:** In the *Emergency Condition* column, a flashing yellow circle <img src={require('./img_ux/icon_techs_fleetemrgyes.png').default} alt="Emergency Tech icon" loading="lazy" /> indicates a mobile user that is currently in the emergency condition, meaning they have manually indicated that they are in danger. All other users not currently in the emergency condition display a gray circle <img src={require('./img_ux/icon_techs_fleetemrgno.png').default} alt="Regular Tech icon" loading="lazy" />.

- **User Id:** The unique identifier assigned to the mobile user from the Config app. No two PRODUCT users will ever have the same User ID.

- **Email:** The email address for the Azure Active Directory user account associated with the user. No two PRODUCT users will ever have the same email address.

- **Business Units:** A comma separated list of all business units associated with the user.

- **Skills:** A comma separated list of all skills associated with the user.

- **Position Latitude:** The latitude coordinate for the mobile user's current position.

- **Position Longitude:** The longitude coordinate for the mobile user's current position.

<hr />

## Customizing Grids

In the Dispatch app, a number of interfaces contain grids used to present data about multiple work orders, tasks, or users. Each time you open the Dispatch app in a new browser window, each of these grids initially display their items using a default column layout and sorting criteria. You can choose to customize the default view of each grid in a number of ways.

Depending on the grid, there are two possible approaches to customizing your view:

- **Profiles:** Profiles are sets of filter and display settings that you can save and apply to Dispatch app windows across sessions. Customizations you define in your profiles are stored on the server, meaning they will be preserved across sessions and are available from different Web browsers. When defining profiles, you specify these customizations using a mockup of the applicable grid. At present, you can define grid customizations in your profiles for only the *Tasks* grid in the Map View and List View interfaces.

    To apply a previously defined profile, at the top-left of the Title Bar, click the **Select profile** drop-down list, choose from any of your saved profiles, and the Dispatch app will refresh to use the grid customizations defined in that profile. For more information on defining and using profiles, see <u>Profiles</u>.

- **Ad Hoc Customizations:** You can apply temporary, ad hoc customizations directly to any grid at any time. Customizations applied in this way last only as long as the current browser window remains open.

    If a profile is currently applied to your Dispatch window, any further ad hoc customizations you make to the *Tasks* grid will *not* alter the profile itself and are removed upon either refreshing the Dispatch window or applying another profile.

In both the actual grids and the grid mockups used to define profiles, the process for customizing grid display settings is identical. In both interfaces, you can access most customization options by hovering your cursor over any column header and clicking the gray down-arrow <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> that appears to the right of the column title, or by clicking and holding any column header until a *Customize columns* panel appears.
<div class="flexContainerImg">
<img src={require('./img_ux/interface_tasks_viewoptionsmenu.png').default} alt="View Options" loading="lazy" border="1px solid #000000" height="212px" />
<img src={require('./img_ux/interface_tasks_customizecolumnsmenu.png').default} alt="Customize Columns" loading="lazy" border="1px solid #000000" height="212px" />
</div>


You can customize the way work orders, tasks, and users are displayed in grids in the following ways:

- [Sorting Items](#sorting-items)

- [Grouping Items](#grouping-items)

- [Displaying Columns](#displaying-columns)

- [Moving Columns](#moving-columns)

- [Resizing Columns](#resizing-columns)

### Sorting Items

Each grid initially lists its items according to a set of default sorting criteria. You can alternatively choose to sort your items by up to 3 grid columns of your choice by clicking column headings. Each column heading you click will display an arrow indicating the current sort direction (<img src={require('./img_ux/icon_tasks_sortasc.png').default} alt="View Options" loading="lazy" /> *ascending* or <img src={require('./img_ux/icon_tasks_sortdesc.png').default} alt="View Options" loading="lazy" /> *descending*), with the shading darkness indicating sort priority (<img src={require('./img_ux/icon_tasks_sortasc.png').default} alt="View Options" loading="lazy" /> primary, <img src={require('./img_ux/icon_tasks_sortsec.png').default} alt="View Options" loading="lazy" /> secondary, <img src={require('./img_ux/icon_tasks_sorttert.png').default} alt="View Options" loading="lazy" /> tertiary). By clicking the same column heading repeatedly, you can toggle between sorting by that column in ascending order <img src={require('./img_ux/icon_tasks_sortasc.png').default} alt="View Options" loading="lazy" />, descending order <img src={require('./img_ux/icon_tasks_sortdesc.png').default} alt="View Options" loading="lazy" />, or removing it as a sort criterion altogether, which removes the arrow. Each time you click a different column, it becomes the new primary sorting criterion, pushing the other criteria down in priority and dropping the last criterion altogether if already sorting by 3 columns. If your custom sort criteria includes fewer than 3 columns, the default sorting criteria is used for secondary or tertiary sorting, as necessary.

Each time you change your sort criteria, all items in the grid will resequence according to the values in your chosen columns. Depending on the type of grid, this resequencing can have slightly different effects:

- **Undivided Grids:** For grids that list items without using pages, if your current filter criteria returns more than 1000 items, then the grid will display only the first 1000 items, chosen according to your current sorting criteria.

    For example, while working in the Map View's *Tasks* grid, if the current region includes 1100 tasks that meet your filter criteria, each of which has been given a Task Number sequentially from '1' to '1000', upon clicking the Task Number column, the Map View will refresh to display tasks '1' to '1000', dropping '1001' to '1100'. If you click the Task Number column a second time, the Map View will refresh to display tasks '1100' to '101', dropping tasks 1-100.

- **Paginated Grids:** For grids that list items using multiple pages, your sorting preferences consider all items on every page.

    For example, while working in the List View's *Tasks* grid, if your current filter criteria returns 247 tasks, each of which has been given a Task Number sequentially from '1' to '247', then upon clicking the Task Number column, all tasks on every page of the List View will immediately resequence in ascending order, with task '1' appearing at the top of the first page. If you click the Task Number column a second time, your tasks will resequence in descending order, with task '247' appearing at the top of the first page.

In addition to clicking column headings, you can also sort by a particular column by hovering your cursor over any column header and clicking the gray down-arrow <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> that appears. In the drop-down menu that appears, you can select either the **Sort Ascending** or **Sort Descending** option, which will display a blue check mark <img src={require('./img_ux/icon_tasks_sort_bluecheck.png').default} alt="Column Options" loading="lazy" />.

<img src={require('./img_ux/interface_tasks_viewoptionsmenu_sort.png').default} alt="View Options" loading="lazy" border="1px solid #000000" />

### Grouping Items
<div class="flexContainerImg">
<img src={require('./img_ux/interface_tasks_customizecolumnsmenu_groupby.png').default} alt="View Options" loading="lazy" border="1px solid #000000" height="211px" />
<img src={require('./img_ux/interface_tasks_viewoptionsmenu_groupby.png').default} alt="Customize Columns" loading="lazy" border="1px solid #000000"  height="211px" />
</div>

By default, each grid initially displays its items in a single, flat list according to your current sorting criteria. However, you can alternatively choose to subdivide your items into multiple groups based on the values in a particular column. Upon grouping by a particular column, the grid will rearrange to display one group per available value in the chosen column, placing each listed item beneath the group corresponding to its associated value. For example, in the Tasks grid, if you choose to group by an "Area" column and all of your tasks are currently associated with only 3 areas, then the grid will rearrange into 3 separate groups each representing one of the possible areas, with each task placed beneath its associated area. You can group by only one column at a time.

<img src={require('./img_ux/interface_tasks_viewoptionsmenu_groupheader.png').default} alt="Customize Columns" loading="lazy" />

Each group is indicated by a gray header that displays the name of its corresponding value next to the total number of items that fall into that group. Within each group, items are sorted according to the grid's current sorting preferences, which you can change as normal, as described in the [Sorting Items](#sorting-items) section above. You can also change the sequence in which the groups themselves appear in the grid by defining an additional sort preference for the 'group by' column, which by default is set to *Sort Ascending* alpha-numeric order according to group name.

#### To group items by a column:

1. To begin grouping by a particular column, do either of the following:

    - Hover your cursor over the column heading you want to group by, click the gray down-arrow <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> that appears to the right of the column title, and in the drop-down list of menu options, click the **Group by this field** option.

        In the drop-down menu for *any* column heading, a blue check mark <img src={require('./img_ux/icon_tasks_sort_bluecheck.png').default} alt="Column Options" loading="lazy" /> appears next to the **Show in groups** option to indicate that your items are currently grouped.

    - Click and hold any column header until the **Customize columns** panel appears, and then click the **Group by** <img src={require('./img_ux/icon_custcol_groupby.png').default} alt="Column Options" loading="lazy" /> icon next to the column you want to group by.

        The *Group by* icon is highlighted in blue <img src={require('./img_ux/icon_custcol_groupbyselect.png').default} alt="Column Options" loading="lazy" /> for the chosen column.

    The Dispatch app subdivides the grid into groups each containing only those items that share the same value from the chosen column. By default, the groups are listed in ascending alpha-numeric order according to group name.

2. To change the sequence in which the groups are listed, click the gray down-arrow <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> for the **same** column heading, and then click **Sort Descending** or **Sort Ascending**.

    The Dispatch app displays a blue check mark <img src={require('./img_ux/icon_tasks_sort_bluecheck.png').default} alt="Column Options" loading="lazy" /> next to the selected option and resequences the groups in descending or ascending alpha-numeric order, as appropriate.

    :::note
    This affects only the group sequence. You can also set sort order within groups by choosing to sort ascending or descending on any other column's values as normal, as described in the [Sorting Items](#sorting-items) section above.
    :::

3. To return to the grid to a flat list, do either of the following:

    - Click the gray down-arrow <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> next to any column heading, and click the currently selected **Show in groups** option.

        The Dispatch app removes the blue check mark from the *Show in groups* menu option.

    - Click and hold any column header until the **Customize columns** panel appears, and then click the blue-highlighted **Group by** <img src={require('./img_ux/icon_custcol_groupbyselect.png').default} alt="Column Options" loading="lazy" /> icon next to the column you are currently grouping by.

        The Dispatch app removes the blue highlighting from the chosen column's icon.

### Displaying Columns

<div class="flexContainerImg">
<img src={require('./img_ux/interface_tasks_viewoptionsmenu_columns.png').default} alt="View Options" loading="lazy" border="1px solid #000000" height="210px" />
<img src={require('./img_ux/interface_tasks_customizecolumnsmenu_columns.png').default} alt="Customize Columns" loading="lazy" border="1px solid #000000"  height="210px" />
</div>

By default, each grid displays all possible columns made available by your organization. You can alternatively choose to temporarily hide certain columns to reduce the amount of information on your screen. You can hide any column in the grid, but you will be prevented from hiding the last displayed column.

To set your currently displayed columns, do either of the following:

- Hover your cursor over any column heading, click the gray down-arrow <img src={require('./img_ux/icon_tasks_downarrow.png').default} alt="Column Options" loading="lazy" /> that appears to the right of the column title, point to **Columns**, and then click any of the listed columns to toggle hiding or displaying that column.

    A blue check mark <img src={require('./img_ux/icon_tasks_sort_bluecheck.png').default} alt="Column Options" loading="lazy" /> appears next to each currently displayed column, and is removed for each currently hidden column.

- Click and hold any column header until the **Customize columns** panel appears and then click the eye icon <img src={require('./img_ux/icon_custcol_colshow.png').default} alt="Column Options" loading="lazy" /> next to any of the listed columns to toggle hiding or displaying that column.

    A blue eye <img src={require('./img_ux/icon_custcol_colshow.png').default} alt="Column Options" loading="lazy" /> appears next to each currently displayed column, and a crossed out gray eye <img src={require('./img_ux/icon_custcol_colhide.png').default} alt="Column Options" loading="lazy" /> appears next to each currently hidden column.

If you have already hidden every other column, the last displayed column in the above lists will be disabled, preventing you from hiding it.

### Moving Columns

<img src={require('./img_ux/interface_tasks_customizecolumnsmenu_movecol.png').default} alt="Column Options" loading="lazy" border="1px solid #000000" />

Perform the following steps to alter the default order in which your columns are displayed.

#### To move columns:

1. Click and hold any column header until the **Customize columns** panel appears.

    The rows listed in this panel represent all available columns. The top-down row sequence represents the left-to-right column sequence currently defined for the grid.

2. At the far-left of the row you want to move, click the gray handle <img src={require('./img_ux/icon_custcol_draghandle.png').default} alt="Column Options" loading="lazy" /> and drag upwards or downwards across one or more adjacent rows.

    As you drag, the entire selected row moves with your cursor to a position either higher or lower in the list. You can only drag rows within the same visible portion of the *Customize Columns* list. To move a row further, you must do so in stages by repeatedly dragging a row and then scrolling the list.

3. When you have reached the desired position for the selected row, release your mouse button.

    The Dispatch app moves the row and the corresponding grid column to the indicated position.

### Resizing Columns

To change the default width of any column in a grid, hover your cursor between the edges of two column headings until it changes into a double-arrow <img src={require('./img_ux/icon_tasks_resizecolumn.png').default} alt="Column Options" loading="lazy" /> icon. When this occurs, click and drag horizontally to alter the width of the column to the left.