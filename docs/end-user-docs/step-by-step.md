---
sidebar_position: 1
id: Step-by-Step Procedures
---

<div class="center">
    <p class="samplePreface">This page includes several task-oriented topics from a user guide describing a mobile workforce app. The content below makes reference to other, excluded sections of the larger document from which these samples were excerpted.</p>
</div>
<hr />

<div style={{ display: 'none' }}>
# Step-by-step Procedures
</div>

## Suspend Tasks

If you need to temporarily halt work on a task, you can suspend the task and return to it later. Suspending your tasks is optional, but has a number of useful effects:

- Your organization is aware of which tasks you have suspended.

- While suspended, the server stops tracking time spent En Route or On Site for the task.

- Upon suspending a task, the ProductApp automatically toggles off Job On tracking for the task, if
applicable.

From either the Task List or the Single Task View, you can suspend any task in any state, and you can have any number of suspended tasks simultaneously. All of your progress on the task is retained, including a  record of the update forms you have already sent as well as any unsent changes to your update forms. When  you are ready to resume work on a suspended task, you can transition the task back to the En Route state.  For more information, see <u>Going En Route</u>.

#### To suspend a task:

1. From the **Task List**, tap the task you want to suspend.

    – or –

    Open the **Single Task View** for the task you want to suspend.

2. On the **Task Toolbar**, tap the **Actions** <img src={require('./img_procs/Button_OrderToolbar_Actions_Icon.png').default} alt="Actions button" loading="lazy" border="1px solid #000000" /> button.

    The ProductApp displays a submenu of optional actions you can perform on the task.

3. In the **Actions** submenu, tap the **Suspend** option.

    The ProductApp displays the **Suspend Task** dialog box.

4. From the **Suspend Reason Code** list, choose the reason for suspending the task.

5. Enter or modify data in any of the other fields configured by your organization, using the following indicators as guidelines:

    - <img src={require('./img_procs/Icon_Error_crop.png').default} alt="Error" loading="lazy" /> : Red outlining indicates an empty mandatory field, or a field whose current value triggers an Error.

    - <img src={require('./img_procs/Icon_Warning_crop.png').default} alt="Warning" loading="lazy" /> : Yellow highlighting indicates a field whose current value triggers a Warning.

    - <img src={require('./img_procs/Icon_ReadOnly_crop.png').default} alt="Read Only" loading="lazy" /> : Gray highlighting indicates a read-only field that you cannot modify.

    For more guidance on form layout, filling out forms, and the types of data entry fields you may encounter, see <u>Forms</u>.

6. Tap the **Suspend** button.

    If prompted about outstanding warnings, tap **Yes** to send without resolving the warnings or **No** to return to the form.

    The ProductApp suspends the task and displays the Task List. Notice the new Suspended icon <img src={require('./img_procs/Interface_JobList_SuspendedOrder_Icon.png').default} alt="Suspended icon" loading="lazy" border="1px solid #000000" /> at the upper-right corner of your suspended task.

<hr />

## Reject Tasks

If you are unable to perform the work on a task, you can reject the task. Rejecting a task removes it from your device and makes it available to be dispatched to another user.

From either the Task List or the Single Task View, you can reject any task in any state.

#### To reject a task:

1. From the **Task List**, tap the task you want to reject.

    – or –

    Open the **Single Task View** for the task you want to reject.

2. On the **Task Toolbar**, tap the **Actions** <img src={require('./img_procs/Button_OrderToolbar_Actions_Icon.png').default} alt="Actions button" loading="lazy" border="1px solid #000000" /> button.

    The ProductApp displays a submenu of optional actions you can perform on the task.

3. In the **Actions** submenu, tap the **Reject** button.

    The ProductApp displays the **Reject task** dialog box.

4. From the **Reject Reason Code** list, choose the reason for rejecting the task.

5. Enter or modify data in any of the other fields configured by your organization, using the following indicators as guidelines:

    - <img src={require('./img_procs/Icon_Error_crop.png').default} alt="Error" loading="lazy" /> : Red outlining indicates an empty mandatory field, or a field whose current value triggers an Error.
    - <img src={require('./img_procs/Icon_Warning_crop.png').default} alt="Warning" loading="lazy" /> : Yellow highlighting indicates a field whose current value triggers a Warning.
    - <img src={require('./img_procs/Icon_ReadOnly_crop.png').default} alt="Read Only" loading="lazy" /> : Gray highlighting indicates a read-only field that you cannot modify.

    For more guidance on form layout, filling out forms, and the types of data entry fields you may encounter, see <u>Forms</u>.

6. Tap the **Reject** button.

    If prompted about outstanding warnings, tap **Yes** to send without resolving the warnings or **No** to return to the form.

    The ProductApp rejects the task and displays the Task List. Notice that the rejected task is no longer listed.

<hr />

## Track Job On Time

While you are En Route or On Site at a task, you may be able to toggle tracking "Job On" time for that task, which is way to explicitly start or stop tracking time spent working on the task. By default, every task begins with Job On tracking toggled off, meaning work time is not being tracked. At any point after entering the En Route state for a task, you can manually toggle Job On tracking on or off as needed by tapping the *Actions* <img src={require('./img_procs/Button_OrderToolbar_Actions_Icon.png').default} alt="Actions button" loading="lazy" border="1px solid #000000" width="22px" /> button, and then tapping the **Job On** switch. This switch is only present for tasks in the En Route or On Site state. If this switch does not appear in any state, then this feature has been disabled for you.

The ProductApp never requires you to track Job On time, but your organization may expect you to do so at certain points. When you should toggle tracking Job On time will vary depending on your organization's business practices, but is often based on how you track billable hours. For example, some organizations may charge for travel time while En Route, whereas others may not begin to charge until after you arrive On Site and have finished preparing the worksite. Some organizations do not track Job On time at all and consider only the time you spend in the En Route or On Site states.

From either the Task List or the Single Task View, you can toggle tracking Job On time on or off as many times as needed for the task at which you are currently En Route or On Site. After toggling on Job On tracking, it will remain on until you either manually toggle it off, or any of the following occur, which will automatically toggle it off:

- You complete the task.
- You suspend the task.
- You go En Route or On Site to a different task.
- You enter the Unavailable condition.
- You sign out.
- The task is removed from your device for any reason.

#### To toggle tracking Job On time:

1. From the **Task List**, tap the task at which you are currently En Route or On Site.

    – or –

    Open the **Single Task View** for the task at which you are currently En Route or On Site.

2. On the **Task Toolbar**, tap the **Actions** <img src={require('./img_procs/Button_OrderToolbar_Actions_Icon.png').default} alt="Actions button" loading="lazy" border="1px solid #000000" /> button.

    The ProductApp displays a submenu of optional actions you can perform on the task.

3. To **start** tracking Job On time, in the **Actions** submenu, tap the **Job On** switch.

    The switch slides to the right and displays a green background <img src={require('./img_procs/Field_CheckBox_Selected.png').default} alt="Slider On" loading="lazy" width="35px" />. While Job On tracking is toggled on for a task, the ProductApp also displays an animated green progress bar at the top of that task in both the Task List and Single Task View.

    <p class="indent2"><img src={require('./img_procs/Interface_JobOn_TaskIndicator.png').default} alt="Job On Progress" loading="lazy" width="500px" /></p>

4. To **stop** tracking Job On time, tap the **Job On** switch again.

    The switch slides back to the left and displays a gray background <img src={require('./img_procs/Field_CheckBox_Cleared.png').default} alt="Slider Off" loading="lazy" width="35px" />. The ProductApp removes the animated progress bar from the task.

<hr />

## Self Dispatch Tasks

Depending on your environment, if you require more work at any point in your day, you may be able to dispatch additional tasks to yourself using the Self Dispatch screen. From this screen, you can search a particular region for any unassigned tasks that you are permitted to work on, and then dispatch any of the identified tasks to yourself so that it appears in your Task List as current work. If this feature is available in your environment, you can self dispatch as many tasks as are available from any region you like at any time. To open the Self Dispatch screen, on the **Menu Bar** at the far-left of the ProductApp interface, tap the **Main Menu** <img src={require('./img_procs/Button_MenuBar_MainMenu.png').default} alt="Main Menu" loading="lazy" /> button and then tap the **Self dispatch** option. If you do not see this option in the Main Menu, then this feature is not available in your environment.

The following sections describe how to use the Self Dispatch screen to dispatch tasks to yourself:

- [Navigate the Self Dispatch screen](#navigate-the-self-dispatch-screen)

- [Retrieve and Self Dispatch Tasks](#retrieve-and-self-dispatch-tasks)

### Navigate the Self Dispatch screen

<img src={require('./img_procs/Interface_SelfDispatch_Annotated.webp').default} alt="Self Dispatch Interface" loading="lazy" width="1000px" />

Each time you open the Self Dispatch screen, it will initially display an empty map interface and you will need to begin by searching for available tasks. To search for tasks, pan and zoom the map in the right-hand pane of the interface so that it displays the region in which you want to find work and then tap the **Search Region** <img src={require('./img_procs/Button_Map_SearchRegion.png').default} alt="Search Region button" loading="lazy" width="25px" /> button at the upper-right corner of the map. After completing the search, the left-hand pane of the screen will display one entry for each identified task and the map will indicate the location of each task found as a colored circle ( <img src={require('./img_procs/Icon_Map_Order.png').default} alt="Task icon" loading="lazy" /> or <img src={require('./img_procs/Icon_Map_OrderEmerg.png').default} alt="Emergency Task icon" loading="lazy" /> ). For more information on the ways you can navigate this map, see <u>Navigating Maps</u>.

Upon searching in a particular region, the Self Dispatch screen will contain the following components:

- **Tasks:** The left-hand pane of the Self Dispatch screen lists each of the tasks found by your latest search. Each task appears as a separate block that provides a brief summary of the task's data on one or more lines. Any emergency tasks are always grouped together at the top of the list, followed by regular priority tasks. Within these two groups, those tasks closest to the end of their appointment windows are positioned highest. Tap any of these tasks and the map will automatically pan and zoom to display the selected task's icon.

    Each listed task may contain any of the following components:

    - <img src={require('./img_procs/Icon_SelfDispatch_List_Emergency.png').default} alt="Emergency Task Triangle" loading="lazy" /> **Emergency Task:** An exclamation mark inside of a red triangle indicates an emergency task considered to be extremely urgent.

    - <img src={require('./img_procs/Button_SelfDispatch_DetailsOpen.png').default} alt="Task Details" loading="lazy" /> **Task Details:** Tap to display the Task Details form for the task. The form will expand to fill the left-hand portion of the screen, while the right-hand portion will continue to display the map. You can view the Task Details form for any listed task at any time. From the Self Dispatch screen, the top of the Task Details form will display a Dispatch button, which performs the same function as the *Dispatch* icon <img src={require('./img_procs/Button_SelfDispatch_TileDispatch.png').default} alt="Dispatch button" loading="lazy" width="12px" /> described below. For more information on the Task Details form, see <u>Task Forms</u>.

        While your interface is split in this way, you can tap any of the task icons on the map to quickly swap between viewing each of their Task Details forms. This can be useful when you want to quickly compare details about several tasks. To close the Task Details form and return to the viewing the task list in your entire interface, tap the gray bar displaying the left arrow <img src={require('./img_procs/Button_SelfDispatch_DetailsClose.png').default} alt="Close Details button" loading="lazy" /> that splits the interface.

    - <img src={require('./img_procs/Button_SelfDispatch_TileDispatch.png').default} alt="Dispatch button" loading="lazy" /> **Dispatch:** Upon selecting a task by tapping its entry or map icon, a Dispatch icon <img src={require('./img_procs/Button_SelfDispatch_TileDispatch.png').default} alt="Dispatch button" loading="lazy" width="12px" /> will appear below the *Task Details* icon. Tap this button to dispatch the task to yourself so that it appears in your Task List as current work. For more information, see the [Retrieve and Self Dispatch Tasks](#retrieve-and-self-dispatch-tasks) section below.

- **Map:** The right-hand pane of the Self Dispatch screen contains a map indicating the locations for eachof the tasks found by your latest search. Each task appears as a colored circle while your own position is indicated by a pulsing person icon <img src={require('./img_procs/Icon_Map_MyPosition.png').default} alt="Self icon" loading="lazy" width="9px" />. A blue circle with a large black dot <img src={require('./img_procs/Icon_Map_Order.png').default} alt="Task icon" loading="lazy" /> indicates a regular priority task, whereas a red circle with a small white dot <img src={require('./img_procs/Icon_Map_OrderEmerg.png').default} alt="Emergency Task icon" loading="lazy" /> indicates an emergency task considered to be extremely urgent.

    Tap any of the icons representing your tasks and the ProductApp will select the entry representing that task in the left-hand pane of the interface. The selected icon will also expand into a pin (<img src={require('./img_procs/Icon_Map_Order_Pin.png').default} alt="Task Pin" loading="lazy" width="20px" /> or <img src={require('./img_procs/Icon_Map_OrderEmerg_Pin.png').default} alt="Emergency Task Pin" loading="lazy" width="20px" />) to help you differentiate it from surrounding tasks. When two or more tasks are so closely located that the current zoom level cannot adequately display them individually, or if they are located at exactly the same position, the map will stack their icons. You can tap an icon stack repeatedly to cycle through selecting each of the tasks at that position. While selecting a task, to get a better sense of its location with respect to your own position, tap the *View Self and Selected Task* <img src={require('./img_procs/Button_Map_ViewMyselfAndOrder.png').default} alt="View Self and Selected Task" loading="lazy" width="28px" /> button at the upper-right corner of the map and the ProductApp will automatically pan and zoom the map to the point at which it can comfortably display both locations.

- **Last updated:** If you have searched for tasks since last opening the Self Dispatch screen, the upper-right corner of the Title Bar will indicate how much time has passed since your last search. This timer resets each time you tap the *Search Region* button.

        <p class="indent1"><img src={require('./img_procs/Interface_LastUpdated.webp').default} alt="Actions button" loading="lazy" width="250px" border="1px solid #000000" /></p>

    As the Self Dispatch screen does not automatically refresh, if a significant amount of time has passed since your last search, you should usually search again before browsing for work to ensure that you have an accurate view of the tasks now available.

### Retrieve and Self Dispatch Tasks

From the Self Dispatch screen, tap the *Search Region* <img src={require('./img_procs/Button_Map_SearchRegion.png').default} alt="Search Region button" loading="lazy" width="25px" /> button to search the currently displayed portion of map for tasks that you can dispatch to yourself. After completing the search, the Self Dispatch screen will display one map icon and one task list entry for each task that meets *all* of the following criteria:

- The task is not currently assigned to any other mobile user.

- The task is located within the portion of map displayed at the time of the search.

    For purposes of this search, a task's location is determined only by its latitude and longitude coordinates and without considering the locations of individual activities. Tasks without explicitly defined coordinates will not appear in the Self Dispatch screen.

- The current time falls within the task's Appointment Window. Tasks whose Appointment Windows have not yet begun or have already ended will not appear in the Self Dispatch screen.

- You belong to the task's Business Unit and Work Queue (if any apply).

    Business Units and Work Queues are associated with mobile users from the Admin app. If you do not belong to any Work Queue, then the Self Dispatch screen will only display tasks that also have no Work Queue.

- You have all of the task's skills (if any apply).

    Skills are associated with mobile users from the Admin app.

The Self Dispatch task search functionality retrieves snapshots of the tasks available in a single region at a specific time. After clicking the *Search Region* <img src={require('./img_procs/Button_Map_SearchRegion.png').default} alt="Search Region button" loading="lazy" width="25px" /> button, if you pan or zoom the map to change your view, you will not find any tasks outside the portion of map that was visible at the time of your search. If you change your view to a different portion of map and then search again, the interface will refresh to display only those tasks available in the portion of map *now* visible, simultaneously removing any previously displayed tasks now outside your view. Similarly, the Self Dispatch map does not automatically refresh to display any changes to retrieved tasks that occur after your search. You may submit a new search to update the map, but each time you click the *Search Region* button, its icon will be replaced by a timer <img src={require('./img_procs/Button_Map_SearchRegion_Timer.png').default} alt="Self Dispatch Timer" loading="lazy" /> preventing you from searching the same region again for 15 seconds. This timer also resets upon panning or zooming the map.

You can search any region at any zoom level, but available tasks will always be retrieved in batches of 20. If the visible portion of map contains more than 20 eligible tasks, scroll down the left-hand paneto retrieve the next available 20 tasks, which will then be added to both the map and task list. You can continue scrolling to retrieve additional tasks until either all available tasks are displayed or you have retrieved a maximum of 200 tasks in total. If the visible portion of map contains more than 200 eligible tasks, the ProductApp will prioritize displaying first emergency tasks, and then those tasks closest to the end of their Appointment Window.

You can self dispatch any of the tasks that appear in the Self Dispatch screen at any time, as long as the task continues to meet all of the eligibility criteria described above and you retain connectivity to the server. However, the Self Dispatch screen does not automatically refresh to display any changes to retrieved tasks that occur after your search. If a task has become unavailable in the time between your last search and clicking the *Dispatch* <img src={require('./img_procs/Button_SelfDispatch_TileDispatch.png').default} alt="Dispatch button" loading="lazy" width="12px" /> button, you will be notified and prevented from self dispatching that task. You will also be prevented from self dispatching a task if you lose connectivity to the server during this interval.

#### To self dispatch a task:

1. On the **Menu Bar**, tap the **Main Menu** <img src={require('./img_procs/Button_MenuBar_MainMenu.png').default} alt="Main Menu" loading="lazy" /> button and then tap the **Self dispatch** option.

    The Self Dispatch screen appears. Initially, no tasks are displayed.

2. In the right-hand pane of the interface, pan and zoom the map by swiping and pinching it with your fingertips until it displays the region in which you want to find work.

3. At the upper-right corner of the map, tap the **Search Region** <img src={require('./img_procs/Button_Map_SearchRegion.png').default} alt="Search Region button" loading="lazy" width="30px" /> button.

    After completing the search, the left-hand pane of the screen will display one entry for each identified task and the map in the right-hand pane will indicate the location of each of these tasks as a colored circle ( <img src={require('./img_procs/Icon_Map_Order.png').default} alt="Task icon" loading="lazy" /> or <img src={require('./img_procs/Icon_Map_OrderEmerg.png').default} alt="Emergency Task icon" loading="lazy" /> ).

4. In the left-hand pane, tap the entry for the task you want to dispatch to yourself.

    – or –

    In the right-hand pane, tap the icon for the task you want to dispatch to yourself.

5. On the selected task's entry in the left-hand pane, tap the **Dispatch** <img src={require('./img_procs/Button_SelfDispatch_TileDispatch.png').default} alt="Dispatch button" loading="lazy" /> icon. 

6. When prompted to confirm, tap the **Dispatch** button.

    The ProductApp dispatches the task to yourself and removes it from the Self Dispatch screen. The task will now be available in your Task List.

    :::note
    If a task has become unavailable in the time between your last search and clicking the Dispatch button, you will be notified and prevented from self dispatching that task. If this occurs, tap the *Search Region* <img src={require('./img_procs/Button_Map_SearchRegion.png').default} alt="Search Region button" loading="lazy" width="25px" /> button again to refresh the interface and then find another task to self dispatch.
    :::

7. To return to the Task List, on the **Menu Bar**, tap the **Main Menu** <img src={require('./img_procs/Button_MenuBar_MainMenu.png').default} alt="Main Menu" loading="lazy" /> button and then tap the **Task list** option.