---
sidebar_position: 1
id: Algorithm Description
---

<div class="center">
    <p class="samplePreface" style={{ width:'55%' }} > This page describes a portion of an algorithm used to assign tasks to technicians.</p>
</div>
<hr />

# 2.3.2.1 Calculating Travel Time 

In order to calculate travel time for any booking, the scheduling algorithm must begin with an idea of the starting point and ending point. In any given shift, there are three kinds of geographic positions that the scheduling algorithm can use for a starting or ending point: a technician’s **Start Location**, a task's **Worksite**, and a technician’s **End Location**.

Based on these kinds of geographic positions, every shift has the following three kinds of travel time:  

<img src={require('./img_tech/TravelTime.webp').default} alt="Tasks grid interface" loading="lazy" width="800px" />

- **A. Start Location to Task Worksite:** For the very first booking of a shift, the scheduling algorithm always begins with an initial travel time from the technician's *Start Location* to the first task’s *Worksite*. This always occurs after any applicable *Shop Time* has elapsed. The scheduling algorithm does not consider travel time to the shop itself.

- **B. Task Worksite to Task Worksite:** In between every booking, the scheduling algorithm  must account for travel time between each task’s *Worksite*.

- **C. Task Worksite to End Location:** For the very last booking of a shift, the scheduling algorithm always ends with a final travel time from the last task’s *Worksite* to the technician’s *End Location*.

Each of these starting and ending points always has a *Sub Area* reference, and may also have specific longitude/latitude coordinates. Travel time between these points can be determined by comparing longitude/latitude coordinates, or by using predefined override or default travel times. Certain characteristics of the technician or task may even indicate that there is no travel time at all.

Because some or all of these values may exist for a given position, the scheduling algorithm determines travel time between any two points according to the following order of precedence:

:::note
In some situations, a task’s individual activities may also have latitude/longitude coordinates, but activity location is never used by the scheduling algorithm to calculate travel time.
:::

<img src={require('./img_tech/TT_Precedence.webp').default} alt="Tasks grid interface" loading="lazy" width="800px" />

1. **Minimum Travel Time**

    In any of the following circumstances, the scheduling algoritm uses a *Minimum Travel Time* defined in a configurable system setting (set to '0' by default):

    - **Inside Worker:** If the technician assigned to the shift is considered an *Inside Worker*.

    - **Same Site Key:** If determining travel time between two task *Worksites* and both tasks share an identical *Same Site Key*.

    - **Missing Start/End Location:** If determining travel time from the *Start Location* or to the *End Location* and the technician assigned to the shift does not have a defined *Start Location* or *End Location* (whichever is applicable).

2. **Sub Area OTT - Starting Point**

    If the Sub Area associated with the starting point has an *Override Travel Time* defined for the ending point, the scheduling algorithm uses this value as the travel time.  

3. **Sub Area OTT - Ending Point**

    If the Sub Area associated with the ending point has an *Override Travel Time* defined for the starting point, the scheduling algorithm uses this value as the travel time.  

4. **Coordinates**

    If BOTH the starting and ending points have defined latitude/longitude *Coordinates*, the scheduling algorithm calculates travel time based on a routing engine that considers the real-world streets in between the starting and ending points.

    :::note
    If the routing engine fails to initialize or is unable to find either of the positions identified by the specified coordinates, the algorithm instead defaults to the *Minimum Travel Time* value described above in situation 1.
    :::

5. **Same Sub Area**

    If the starting and/or ending point lack defined coordinates and are both associated with the **same** Sub Area, then the scheduling algorithm does one of the following:

    - **5.1:** If **only one** of the starting or ending points lack defined coordinates, the algorithm substitutes the missing coordinates with those from the **Sub Area** and then calculates travel time as described above in situation 4.

    - **5.2:** If **both** the starting and ending points lack defined coordinates, the algorithm uses one of the following **Default Travel Time** values as the travel time:

        - **a. Sub Area DTT:** If available, the algorithm uses the Sub Area's *Default Travel Time*.
        - **b. System Settings DTT:** If no value is available for the Sub Area, the algorithm uses the Global Settings *Default Travel Time*.

6. **Different Sub Areas**

    If the starting and/or ending point lack defined coordinates and are associated with **different** Sub Areas, then the scheduling algorithm substitutes any missing coordinates with those from the **Sub Area** associated with the missing point(s) and then calculates travel time as described above in situation 4.
    
    For example, if the starting point has coordinates, but the ending point does not, then the routing engine calculates travel time between the starting point's coordinates and the coordinates of the Sub Area associated with the ending point.