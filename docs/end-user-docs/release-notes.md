---
sidebar_position: 3
id: Release Notes
toc_min_heading_level: 2
toc_max_heading_level: 4
---

<div class="center">
    <p class="samplePreface">This page contains a set of quarterly release notes for an enterprise-class SaaS solution. Each note identifies one or more ticket numbers, which may reference either an internal Jira item or a customer-accessible Salesforce ticket.</p>
</div>
<hr />

# PRODUCT Release Notes - 1.11.1

This document summarizes the changes made in PRODUCT Version 1.11.1. For release notes from previous versions of PRODUCT, see <u>PRODUCT Release Notes - Previous Releases</u>

This document includes the following sections:

- [Changes](#changes)

- [Fixed Issues](#fixed-issues)

- [Known Issues](#known-issues)

## Changes

This release introduces the following changes to PRODUCT functionality:

### Account

- #### Cost - Subdomain renamed to "Expense"

    The Cost subdomain has been renamed to "Expense". This change applies to all user interfaces and data schemas.

    Renaming this subdomain includes the following schema-level changes:

    - The "costGUID" attribute is now "expenseGUID"

    - The "cost" attribute is now "expenseId"

    - PRODUCT APIs now use the following identifiers for the Expense subdomain:

        - REST path parameter id: expenseelement

        - Bulk ingestion payload id: expenseelements

    <p class="tickets">Tickets: DE-12345, DE-45678</p>

- #### Department - Cannot delete records when within "Date Determined" validity range

    A Department record with a Status of "Date Determined" can no longer be deleted when the current date and time is within the validity range determined by the "Valid from" to "Valid to" attributes.

    <p class="tickets">Tickets: DE-98765, DE-65432</p>

### Admin

- #### Entitlement based authorization

    This release introduces the option of using entitlement based authorization, which may be enabled or disabled per PRODUCT environment. Entitlement based authorization employs the new *People.Entitlement* subdomain to determine user-specific access to individual Position subdomain records based on their Service Provider.

    When entitlement based authorization is enabled for an environment, each Entitlement record defines a list of one or more Organization records, including those used by Position records as their Service Provider. Each user may then have one or more Entitlement records assigned to each of their Security Profiles, granting them access to those Positions whose *Service Provider* is included in the Entitlements assigned to their security profiles.

    Entitlement assignments are *user-specific*, meaning two different users could have different entitlements for the same security profile. The security profile to which an entitlement is assigned also determines the degree of access that the user is granted to any Positions covered by that entitlement. In this way, some users may be granted read-only access to a certain Asset Position record, while others may be permitted to modify or delete that same record.

    For more information about entitlement based authorization, in the *Admin Help*, see the "Entitlements" section.

    <p class="tickets">Tickets: DE-45454</p>

- #### New "Workflow Permissions" profile settings

    In the Admin application, you can now define a new category of "Workflow Permissions" for security profiles. Workflow permissions determine the actions a user can perform in the applications and subdomains granted by Application Permissions and Domain Permissions. Workflow permissions can restrict a user's ability to create, modify, or transition each subdomain's records through their lifecycle states.

    If a user is denied permission to a particular action based on Workflow Permissions, the user interface elements representing that action will not appear to the user in any tool. Similarly, the PRODUCT API will reject any request by that user to perform the denied action.

    For more information about workflow permissions, in the *Admin Help*, see the "Security Profile Permissions" section.

    <p class="tickets">Tickets: DE-33333, SFDC 20241107-112255</p>

### Asset Registry

- #### Asset - "Asset Model" moved on detail screens

    In the Grid View application, in the Asset detail screen, while creating or updating an asset record, the "Asset Model" field now appears in the header section at the top of the screen, directly below the "Serial Number" field. This change does not apply to the Asset detail screen in read-only mode, which continues to display the Asset Model field in the "Templates" section.
    
    <p class="tickets">Tickets: DE-55222</p>

- #### Position - New "Draft" status

    The Position subdomain now includes a new "Draft" status intended to provide an additional checkpoint before record activation. This new status introduces the following changes to PRODUCT functionality:

    - You can now create new Position records in the Draft status.

    - You can now manually transition Position records from the Draft to Active status.

        The Owner and Operator fields are mandatory when performing this state transition. The Activation Date and Time is automatically captured at the time of transition.

        Tasks are now automatically generated upon activating an Position record, instead of upon initial Position creation.

    <p class="tickets">Tickets: DE-99999</p>

### MobileApp

- #### 10MB photographic attachment limit

    When working in a MobileApp update form, the MobileApp now enforces a maximum file size limit of 10MB for photographic attachments. If you attempt to add an attachment exceeding 10MB to a form, the MobileApp will display an error and reject the attachment.

    <p class="tickets">Tickets: DE-44698, SFDC 20231117-7895455</p>

- #### Job On Workflow

    The Task List and Task Details interfaces now include a new "Job On" switch used to track time spent working on particular tasks. While a user is En Route or On Site at a task, they can now toggle this Job On switch to start or stop tracking time spent working. This feature enables your mobile users to track billable hours separately from time spent in the En Route or On Site state according to your organization's own business practices

    The total duration of Job On time for a task is always communicated to the host by WorkOrder canonical message upon task completion.

    For more information about the Job On feature, in the MobileApp Help, see the "Tracking Job On Time" section.

    <p class="tickets">Tickets: DE-25874, SFDC 20231104-5544687</p>

## Fixed Issues

In this release, the following issues were resolved:

- #### Catalog - Manufacturer part numbers can have duplicate Order of preference

    When creating or updating a Catalog record, it was previously possible to define multiple manufacturer part numbers with the same "Pref Order" value. This issue has been resolved, and "Pref Order" values must now always be unique for manufacturer part numbers within the same Catalog record.

    <p class="tickets">Tickets: DE-74136, SFDC 20241101-8574963</p>

- #### Data Model - Can add custom attributes to Attachments subdomain

    In the Data Model application, on the Domains tab, users were previously permitted to add custom attributes to the Attachments subdomain, which does not support custom attributes. This issue has been resolved, and the customAttributes node has been removed from the Domains tab for the Attachments subdomain.

    <p class="tickets">Tickets: DE-96415, SFDC 20241031-6543218</p>

- #### Grid View - Advanced search has blank "Attachments" column

    In the Grid View application, in any advanced search window containing an Attachments column, this column was previously appearing blank for records with only 1 associated record attachment. This issue has been resolved, and the Attachments column in advanced search windows now always displays the correct number of associated record attachments.

    <p class="tickets">Tickets: DE-85858</p>

- #### CRUD API - /bulk endpoint accepts task creation without permissions

    In the previous release, the `/bulk` endpoint of the CRUD API would accept a request to create a new task record from a service account that lacked the "Create" workflow permission for the task subdomain. This issue has been resolved, and a task creation request to the `/bulk` endpoint is now rejected if the requesting service account lacks the "Create" workflow permission.

    <p class="tickets">Tickets: DE-96969</p>

## Known Issues

This release includes the following known issues:

- #### Analytics - "Loading" screen hangs

    Due to a known issue with a 3rd party plugin, the Analytics application may sometimes fail to load, displaying only a "Loading" screen indefinitely. If this occurs in your environment, as a workaround you can restart the "pd-analytic" pod, after which you should be able to access the Analytics application as normal. This issue will be resolved in a future release.

    <p class="tickets">Tickets: DE-45654, SFDC 20241029-1234545, 20241115-6549898</p>

- #### Query API - "must_not" term query on inlined data excludes null reference attributes

    In Query API request paylods, when using a "must_not" compound clause with a "term" leaf clause on a reference attribute, the result set will not include any records where that reference attribute is null. For example, the following query criteria would return locations with whose GIS type is "Linear" or "Area", but would not include locations with no GIS type at all:

    <p class="indent1">`"must_not": [ {"term": {"locationGIS": "Point"} } ]`</p>

    As a workaround, your query criteria may use the "exists" leaf clause to directly test for null values. For example, the following query criteria instructs the API to return both locations with a GIS type of either "Linear" or "Area", and also those locations with no GIS type at all:

    <div class="indent1">
    ```
    "should": [
        { "must_not": [ {"term": {"locationGIS": "Point"}} ] },
        { "must_not": [ {"exists": {"field": "locationGIS"} } ] },
    ]
    ```
    </div>

    <p class="tickets">Tickets: DE-54659</p>