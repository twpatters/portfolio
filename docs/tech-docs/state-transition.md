---
sidebar_position: 1
id: State Transition
---

<div class="center">
    <p class="samplePreface" >This page describes back-end system behavior resolving state transitions initiated by a SOAP API request. This content  makes reference to other, excluded sections of the larger document from which this sample was excerpted.</p>
</div>
<hr />

# 2.2 Task Progression Workflow

The following diagram outlines the normal and expected state transitions for a task. Each transition path is labelled with the canonical message and update type that triggers the state change. For example, when transitioning from the Dispatched to EnRoute state, the diagram uses the label ‘WorkOrder-EnRoute’, meaning it is triggered by sending the *WorkOrder* message with an @eventType of ‘EnRoute’.

These are the normal transitions that the 3rd Party Application (**3PA**) should follow as closely as possible. PRODUCT is designed to handle many different conditions and is able to resolve non-standard state transitions, but any deviations from these prescribed transitions may result in incorrect or inconsistent data.

<img src={require('./img_tech/StateTransition.webp').default} alt="Tasks grid interface" loading="lazy" width="900px" />

## 2.2.1 Resolving Non-Standard Task Progression

The following procedure describes a normal task progress workflow for the Scheduling Only feature:

1. *3PA* or *Dispatcher* creates a task.

2. *3PA*, *Dispatcher*, or *Server* assigns the task to a *Technician*.

3. If the task is an emergency, *3PA* sends a **WorkOrder/MobileUserAcknowledged** message on behalf of the *Technician* to manually acknowledge the task.

4. *3PA* sends **WorkOrder/EnRoute** message on behalf of the *Technician* to report that the Technician has begun traveling to the task worksite.

    See the sample message in section <u>A.1 - 3PA sends an EnRoute update</u>.

5. *3PA* sends **WorkOrder/OnSite** message on behalf of the *Technician* to report that the Technician has arrived at the task worksite.

6. *3PA* does one of the following:

    - If the *Technician* wants to indicate the task has been completed, the *3PA* sends a normal **WorkOrder/Complete** message on behalf of the Technician.

    - If the *Technician* wants to suspend the task prior to completion, the *3PA* sends a **WorkOrder/Suspended** message on behalf of the Technician to update the task’s suspend timestamp.

Task lifecycle progression should adhere to the above workflow as closely as possible to avoid errors, but PRODUCT is able to resolve non-standard state transitions. For example, if the 3PA sends an EnRoute message naming a different Technician than the one presently assigned to the task, PRODUCT will first reassign the task to the new Technician and then go EnRoute. Whenever such state resolution is required, PRODUCT will send all normal notifications to the 3PA for each action and state transition required to correctly resolve the situation.

The following procedure outlines some workflow examples that would require state resolution and describes how PRODUCT would resolve the situation. If the normal task lifecycle progression described above is adhered to, these situations should not occur:

1. The *3PA* sends **WorkOrder/EnRoute** message on behalf of the technician to report that the *Technician* has begun traveling to the task location.

2. PRODUCT does one of the following:

    - If the task is already assigned to the technician, PRODUCT updates both the task and *Technician* to the EnRoute state and responds to the *3PA* with a **WorkOrder/EnRoute** message.

    - If the task is presently assigned to another technician, PRODUCT first reassigns the task to the intended technician with the internal reason code "???", and then updates both the task and *Technician* to the EnRoute state.
        
        PRODUCT responds to the *3PA* with a **WorkOrder/Assigned** message followed by a **WorkOrder/EnRoute** message.
    
    - If the *Technician* is already EnRoute to the task, PRODUCT updates the task’s EnRoute timestamp.

    - If the *Technician* is currently in the Unavailable state, PRODUCT makes the technician available first and then goes EnRoute. PRODUCT responds to the *3PA* with a **UserStatus/Available** message and a **WorkOrder/EnRoute** message.  

        See the sample message in section <u>A.2 - 3PA sends an Unavailable update</u>. 
