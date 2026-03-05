---
sidebar_position: 1
id: Enterprise Data Query API
---
<div class="center">
    <p class="samplePreface">This is an excerpt from a guide describing a RESTful data query API for an enterprise-class SaaS solution. The content below makes reference to other, excluded sections of the much larger document from which this sample was excerpted.</p>
</div>
<hr />

# 2.2 Query API

The Query API endpoints of the PRODUCT REST interface support <b>read-only</b> operations for requesting data about one or more PRODUCT records. Using the Query API, you can retrieve entire records or record quantity breakdowns based on query criteria and geographic location.

The following request will return an <b>OpenAPI</b> document containing the full definition for the Query API:
<table class="fullTable">
    <col class="method" />
    <col />
    <tbody>
        <tr>
            <td class="getMethod">GET</td>
            <td class="getUrl">/query/swagger</td>
        </tr>
    </tbody>
</table>
The Swagger Editor tool provides an easy way to read and interpret OpenAPI documents, which you can access online or download from the following Web site:

<p class="code">[https://swagger.io/swagger-editor/](https://swagger.io/swagger-editor/)</p>

The OpenAPI document referenced above describes <i>every</i> operation available to the Query API endpoints, including those which are intended for use solely by internal PRODUCT applications. The following topics provide detailed descriptions for only those Query API operations intended for use by external host systems integrating with PRODUCT:

- [2.2.1 POST queryQty](#221-post-queryqty)
- [2.2.2 (GET/POST) queryLoc](#222-getpost-queryloc)

The following topic provides additional guidance on using the above operations:

- [2.2.3 Query Criteria](#223-query-criteria)

:::note

In each operation description, a <b>red asterisk <span style={{ color: '#FF0000' }}>*</span></b> indicates a parameter that is always required in order to successfully send the request. Any parameters not marked with an asterisk are optional or situational.

:::

## 2.2.1 POST queryQty

Retrieves record quantity breakdowns from the table specified in the path according to criteria defined in the request body. In the request body, one or more query criteria members establish a result set of records that you wish to analyze, and a groups member defines groupings into which these records should be categorized. The response includes a JSON array containing one object for each requested grouping. Each object indicates its apportioned quantity of records as either a count or a percent of the total, as specified in the request.

The following sections describe this operation in detail:

 - [2.2.1.1 Method and URL](#2211-method-and-url)
 - [2.2.1.2 Parameters](#2212-parameters)
 - [2.2.1.3 Request body](#2213-request-body)
 - [2.2.1.4 Responses](#2214-responses)
 - [2.2.1.5 Request/Response examples](#2215-requestresponse-examples)

### 2.2.1.1 Method and URL

<table class="fullTable">
    <col class="method" />
    <col />
    <tbody>
        <tr>
            <td class="postMethod">POST</td>
            <td class="postUrl">/query/\{subschema\}/\{table\}/qty</td>
        </tr>
    </tbody>
</table>

**Sample request URL:** The following request method and URL returns a breakdown of record quantities from the "work.tasks" table:

<p class="code">POST https://<span></span>mycompany.enterprise.com/query/work/tasks/qty</p>

### 2.2.1.2 Parameters

<table class="fullTable">
    <col />
    <col />
    <col />
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>subschema<span style={{ color: '#FF0000' }}>*</span></td>
            <td>path</td>
            <td>
                An identifier for the subschema whose records you want to analyze. This may be any of the values returned by the following CRUD API operation:

                <p class="code">GET /crud/refs?docref=prd.subschemas.json</p>
            </td>
        </tr>
        <tr>
            <td>table<span style={{ color: '#FF0000' }}>*</span></td>
            <td>path</td>
            <td>
                An identifier for the table whose records you want to analyze. This may be any of the values returned by the following CRUD API operation:

                <p class="code"> GET /crud/refs?docref=prd.\{subschema\}.tables.json</p>
            </td>
        </tr>
    </tbody>
</table>

### 2.2.1.3 Request body
<div class="smallCodeBlock">
```
{
    "filters": {
        "<Attribute>": <value>, "<Attribute>": <value>
    },
    "wildcard": {
        "<Attribute>": "<value>", "<Attribute>": "<value>"
    },
    "must": [
        {<term/terms/exists/wildcard/range/must/must_not/should>},
        {<term/terms/exists/wildcard/range/must/must_not/should>}
    ],
    "must_not": [
        {<term/terms/exists/wildcard/range/must/must_not/should>},
        {<term/terms/exists/wildcard/range/must/must_not/should>}
    ],
    "should": [
        {<term/terms/must/must_not/should>},
        {<term/terms/must/must_not/should>}
    ],
    "groups": {
        "cats": [
            {
                "field": "<Attribute>"
                "range": {"<LowerOperator>": <LowerLimit>, "<UpperOperator>": <UpperLimit>},
                "name": "<ReturnedGroupsName>"
            },
            ...
        ],
        "units": "<count/percent>"
    }
}
```
</div>

<table class="fullTable">
    <col style={{ width: '120px' }} />
    <col />
    <col />
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="req-query-criteria">
            <td>
                filters

                wildcard
                
                must

                must_not
                
                must
            </td>
            <td>
                Object

                Array

                Array
                
                Array

                Array
            </td>
            <td>
                **Query Criteria**

                The request body may include any of these members in any combination to define query criteria for a <b>total result set</b> of records from the specified table. The response will break down the quantity of records in this total result set according to the rules defined in the [groups](#req-groups) member of the request.

                If you exclude all Query Criteria members, then the total result set includes every available record from the specified table.

                For information on defining Query Criteria members, see [2.2.3 Query Criteria](#223-query-criteria).
            </td>
        </tr>
        <tr id="req-groups">
            <td>groups<span style={{ color: '#FF0000' }}>*</span></td>
            <td>Object</td>
            <td>This object's child members define how the response should break down the quantity of records included in the total result set determined by the [Query Criteria](#req-query-criteria) members. In summary, the `groups.cats` member defines groupings into which each record should be categorized, and the `groups.units` member indicates whether each grouping should report its record quantity as either a count or a percent of the total.</td>
        </tr>
        <tr id="req-cats">
            <td><p class="LVL_Pfx1">cats<span style={{ color: '#FF0000' }}>*</span></p></td>
            <td>Array - Objects</td>
            <td>
                Defines groupings into which the records from the total result set should be categorized. Each object in the `cats` array defines a separate grouping criterion based on a single attribute identified in the child `field` member. In the response returned by PRODUCT, a `returnedgroups` array contains one object for each record grouping resulting from your `cats` objects.

                Each object in the `cats` array may define its grouping criterion according to one of two possible approaches:

                - **Value Breakdown (field):** If you include only the `cats.field` member, PRODUCT defines one record grouping for **each available value** from the specified attribute. In the response, the `returnedgroups` array includes one object for each value held by at least one record from the total result set. In each returned object, the `name` member indicates the applicable value, and the `value` member indicates the quantity of records holding that value.

                    Records with a **null** value for the `field` attribute are excluded from all groupings.

                - **Range Grouping (field / range / name):** For date-time and numeric attributes only, you may include the `cats.field`, `cats.range`, and `cats.name` members to define a **single record grouping** for a particular value range applicable to the `cats.field` attribute. In the response, the `returnedgroups` array includes one object corresponding to this grouping, with a `name` member matching the request's `cats.name`, and a `value` member indicating the quantity of records from the total result set that fall within the request's `cats.range`.

                    In this scenario, you would likely define multiple cats objects for the same "field" attribute, each corresponding to a different range of values. For example, for the "severity" attribute, you might define three `cats` objects, one each for the value ranges "0-32", "33-66", and "67-99".
                
                You may define multiple `cats` objects using any combination of the above approaches, but be aware that a given record will be counted in **all** record groupings for which it qualifies. There are no restrictions preventing the same record from being counted multiple times in different groupings.
            </td>
        </tr>
        <tr>
            <td><p class="LVL_Pfx2">field<span style={{ color: '#FF0000' }}>*</span></p></td>
            <td>String</td>
            <td>A single attribute from the specified table from which you want to derive record groupings in the response, as described in the [cats](#req-cats) member above.</td>
        </tr>
        <tr>
            <td><p class="LVL_Pfx2">range</p></td>
            <td>Object</td>
            <td>
                If the `cats.field` member identifies a **date-time or numeric** attribute, you may optionally include the `range` member to define a value range for a single record grouping that will include only those records from the total result set that fall within that range. If included, the `range` member specifies an object defining lower and upper range limits, according to the following format:

                <p class="indent1">`"range": {"<LowerOperator>": <LowerLimit>, "<UpperOperator>": <UpperLimit>}`</p>

                Where:

                - Your **\<LowerOperator\>** may be either `gt` (greater than) or `gte` (greater than or equals), and your **\<UpperOperator\>** may be either `lt` (less than) or `lte` (less than or equals).

                    You must include both an upper and lower range limit

                - Your **\<LowerLimit\>** and **\<UpperLimit\>** you must specify a single decimal, integer, or date-time value, as applicable to the attribute.

                For example:

                <p class="indent1">`"range": {"gt": 4, "lt": 10}`</p>
                <p class="indent2">– or –</p>
                <p class="indent1">`"range": {"gte": "2024-04-22T00:00:00.000Z", "lte": "2024-04-23T23:59:59.999Z"}`</p>
                <p class="indent2">– or –</p>
                <p class="indent1">`"range": {"gte": "now/M-1M", "lte": "now/M"}`</p>

            </td>
        </tr>
        <tr>
            <td><p class="LVL_Pfx2">name</p></td>
            <td>String</td>
            <td>
                If you include the `cats.range` member, then the `name` member is **required** and specifies the name that will identify the record grouping in the response's `returnedgroups` array.
                
                If you exclude the `cats.range` member, then you should also exclude `name`.
            </td>
        </tr>
        <tr id="req-units">
            <td><p class="LVL_Pfx1">units<span style={{ color: '#FF0000' }}>*</span></p></td>
            <td>String</td>
            <td>
                One of the following values determining how each record grouping in the response's `returnedgroups` array should report its quantity of records in the `value` member:

                - **count**
                
                    Each grouping reports its apportioned quantity of records as a numeric count.
                
                - **percent**

                    Each grouping reports its apportioned quantity of records as a percentage of the total count of all records included in the response.

                    Effectively, this means that percentage is calculated against the total quantity of records that are **both** included in the total result set determined by the [Query Criteria](#req-query-criteria) members **AND** also have a defined value in all `cats.field` members included in the request. Records with a **null** value in **any** `cats.field` member submitted in the request are filtered out of the entire response.
            </td>
        </tr>
    </tbody>
</table>

### 2.2.1.4 Responses

<table class="fullTable">
    <col />
    <col />
    <thead>
        <tr>
            <th>Code</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>200</td>
            <td>
                ***OK***

                Success. The response body contains a JSON object including the following members:

                <div class="smallCodeBlock">
                ```
                {
                    "total": <integer>,
                    "returnedGroups": [
                        {
                            "name": "<string>",
                            "value": <value>
                        },
                        ...
                    ],
                    "units": "<string>"
                }
                ```
                </div>

                - **total:** An integer indicating the total quantity of records apportioned to each record grouping included in the response's `returnedgroups` array. If the request's [groups.units](#req-units) member was set to `count`, this is the sum of all value members in the returnedgroups array. If the request's "[units](#req-units)" member was set to `percent`, be aware that this is **NOT** necessarily the number against which your **percentages** are calculated.

                    If your request included multiple [groups.cats](#req-cats) objects referencing different `field` members, then the `total` value may be misleading. For example, consider a situation which your request included two `groups.cats` objects containing `field` members of "requestType" and "severity", and your query criteria returns 10 records. In the response, the `total` member would state a value of '20', as each record would be counted in the groupings derived from both "requestType" and "severity".

                - **returnedGroups:** An array containing one object for each record grouping derived from the request's [groups.cats](#req-cats) objects. Each `returnedgroups` object includes a `name` and a `value` member. These `returnedgroups` objects are derived in two possible ways:

                    - **Value Breakdown (field):** A request `groups.cats` object that included only the `field` member will result in one `returnedgroups` object for **each available value** from the "field" attribute. Each object corresponds to a particular value held by at least one record from the total result set, with the `name` member indicating the applicable value, and the `value` member indicating the quantity of records holding that value.
                    
                        Records with a **null** value for the "field" attribute are excluded from all groupings.

                    - **Range Grouping (field / range / name):** A request `groups.cats` object that included the `field`, `range`, and `name` members will result in a single `returnedgroups` object corresponding to a particular value range applicable to the "field" attribute. The `name` member matches the request's "name", and the `value` member indicates the quantity of records from the total result set that fall within the request's "range".

                    In each `returnedgroups` object, the `value` member reports the applicable record quantity as either a count, or a percentage of all records included in the response, depending on the request's [groups.units](#req-units) member. Percentages are NOT necessarily calculated against the response's `total` member.

                - **units:** The value specified in the request's [groups.units](#req-units) member, which is either "count" or "percent".

                For examples of the potential responses to certain request bodies, see [2.2.1.5 Request/Response examples](#2215-requestresponse-examples) below.
            </td>
        </tr>
        <tr>
            <td>400</td>
            <td>
                **Bad Request**

                Unsuccessful. This may indicate a problem with your request body, such as a missing or unrecognized member or attribute, a data type mismatch, or a JSON syntax error (e.g. missing comma or brace). The response body typically provides additional details.
            </td>
        </tr>
        <tr>
            <td>401</td>
            <td>
                **Unauthorized**

                Unsuccessful. The request did not supply a valid JWT bearer token. The response body typically provides additional details. For information on user authentication, see <u>2.1 REST Communication Requirements</u>.
            </td>
        </tr>
                <tr>
            <td>403</td>
            <td>
                **Forbidden**

                Unsuccessful. This may indicate either of the following problems with your request:

                - The subschema or table named in the path does not exist or was misspelled. To obtain a list of valid subschema and table identifiers, use the following CRUD API operations:
                    <p class="code"> GET /crud/refs?docref=prd.subschemas.json</p>
                    <p class="code">GET /crud/refs?docref=prd.\{subschema\}.tables.json</p>

                - The user associated with the supplied JWT token does not have access to the table named in the path. For information on user authorization, see <u>2.1 REST Communication Requirements</u>.

            </td>
        </tr>
        <tr>
            <td>500</td>
            <td>
                **Internal Server Error**

                Unsuccessful. This error is returned if your request failed to include any body or it may indicate a problem with an internal PRODUCT system component. The response body typically provides additional details.
            </td>
        </tr>
    </tbody>
</table>

### 2.2.1.5 Request/Response examples
This section provides several sample request bodies sent to the `/query/{subschema}/{table}/qty` endpoint and their corresponding responses. These responses are based on the following sample record set for the "work.tasks" table:

<div class="center">
<table>
    <col />
    <col />
    <col />
    <col />
    <col />
    <thead>
        <tr>
            <th>taskId</th>
            <th>requestType</th>
            <th>severity</th>
            <th>status</th>
            <th>createdTime</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Tk-00010</td>
            <td>Defect</td>
            <td>2</td>
            <td>Open</td>
            <td>2024-09-04T16:05:28.000Z</td>
        </tr>
        <tr>
            <td>Tk-00011</td>
            <td>Defect</td>
            <td>71</td>
            <td>Open</td>
            <td>2024-09-04T17:26:41.000Z</td>
        </tr>
        <tr>
            <td>Tk-00012</td>
            <td>Defect</td>
            <td>5</td>
            <td>Open</td>
            <td>2024-09-09T10:11:32.000Z</td>
        </tr>
        <tr>
            <td>Tk-00013</td>
            <td>Defect</td>
            <td>92</td>
            <td>Open</td>
            <td>2024-09-14T12:04:07.000Z</td>
        </tr>
        <tr>
            <td>Tk-00014</td>
            <td>Defect</td>
            <td>42</td>
            <td>Open</td>
            <td>2024-10-06T19:48:56.000Z</td>
        </tr>
        <tr>
            <td>Tk-00015</td>
            <td>Schedule</td>
            <td>51</td>
            <td>Open</td>
            <td>2024-10-08T11:18:03.000Z</td>
        </tr>
        <tr>
            <td>Tk-00016</td>
            <td>Schedule</td>
            <td>1</td>
            <td>Open</td>
            <td>2024-10-25T10:19:44.000Z</td>
        </tr>
        <tr>
            <td>Tk-00017</td>
            <td>Schedule</td>
            <td>10</td>
            <td>Potential</td>
            <td>2024-10-28T15:33:12.000Z</td>
        </tr>
        <tr>
            <td>Tk-00018</td>
            <td>Predictive</td>
            <td>88</td>
            <td>Potential</td>
            <td>2024-10-28T15:35:27.000Z</td>
        </tr>
        <tr>
            <td>Tk-00019</td>
            <td>Predictive</td>
            <td>7</td>
            <td>Potential</td>
            <td>2024-10-28T15:41:55.000Z</td>
        </tr>
    </tbody>
</table>
</div>

<table class="fullTable">
    <col style={{ width: `75px` }} />
    <col  style={{ width: `75px` }} />
    <col />
    <thead>
        <tr>
            <th>Request Body</th>
            <th>Response Body</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "must": [
                        {
                          "exists": {"field": "severity"}
                        }
                      ],
                      "groups": {
                        "cats": [
                          {
                            "field": "requestType"
                          }
                        ],
                        "units": "count"
                      }
                    }
                    ```
               </div>
          </td>
         <td>
             <div class="smallCodeBlock">
             ```
             {
               "total": 10,
               "returnedgroups": [
                 {
                   "name": "Defect",
                   "value": 5
                 },
                 {
                   "name": "Schedule",
                   "value": 3
                 },
                 {
                   "name": "Predictive",
                   "value": 2
                 }
               ],
               "units": "count"
             }
             ```
             </div>
         </td>
           <td>
             - **Request:**
                 - The `must` member produces a *total result set* that includes **all** sample records.
                 - 1 `groups.cats` object requesting a value breakdown for "requestType".
                 - Record quantities should be reported as a **count**.
             - **Response:**
                - The *total result set* includes 10 records: 5 have a *requestType* of "Defect", 3 of "Schedule", and 2 of "Predictive".
                - The `total` member's count of all records apportioned to each `returnedgroups` object matches the quantity of records in the *total result set*.
         </td>
        </tr>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "must": [
                        {
                          "exists": {"field": "severity"}
                        }
                      ],
                      "groups": {
                        "cats": [
                          {
                            "field": "requestType"
                          }
                        ],
                        "units": "percent"
                      }
                    }                    
                    ```
               </div>
            </td>
            <td>
             <div class="smallCodeBlock">
             ```
             {
               "total": 10,
               "returnedgroups": [
                 {
                   "name": "Defect",
                   "value": 50
                 },
                 {
                   "name": "Schedule",
                   "value": 30
                 },
                 {
                   "name": "Predictive",
                   "value": 20
                 }
               ],
               "units": "percent"
             }
             ```
             </div>
            </td>
            <td>
              - **Request:**
                  - The `must` member produces a *total result set* that includes **all** sample records.
                  - 1 `groups.cats` object requesting a value breakdown for "requestType".
                  - Record quantities should be reported as a **percent**.
              - **Response:**
                - The *total result set* includes 10 records: 50% have a *requestType* of "Defect", 30% of "Schedule", and 20% of "Predictive".
                - The `total` member's count of all records apportioned to each `returnedgroups` object matches the quantity of records in the *total result set*.
            </td>
        </tr>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "must": [
                        {
                          "term": {"status": "Open"}
                        }
                      ],
                      "groups": {
                        "cats": [
                          {
                            "field": "requestType"
                          }
                        ],
                        "units": "percent"
                      }
                    }                    
                    ```
               </div>
            </td>
            <td>
             <div class="smallCodeBlock">
             ```
             {
               "total": 7,
               "returnedgroups": [
                 {
                   "name": "Defect",
                   "value": 71.4285714285
                 },
                 {
                   "name": "Schedule",
                   "value": 28.5714285714
                 }
               ],
               "units": "percent"
             }
             ```
             </div>
            </td>
            <td>
              - **Request:**
                  - The `must` member produces a *total result set* including only sample records with a **status** of "Open".
                  - 1 `groups.cats` object requesting a value breakdown for "requestType".
                  - Record quantities should be reported as a **percent**.
              - **Response:**
                - The *total result set* includes 7 records: 71.4% have a *requestType* of "Defect' and 28.6% of "Schedule".
                - The `total` member's count of all records apportioned to each `returnedgroups` object matches the quantity of records in the *total result set*.
            </td>
        </tr>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "must": [
                        {
                          "exists": {"field": "severity"}
                        }
                      ],
                      "groups": {
                        "cats": [
                          {
                            "field": "requestType"
                          },
                          {
                            "field": "status"
                          }
                        ],
                        "units": "count"
                      }
                    }                    
                    ```
               </div>
            </td>
            <td>
             <div class="smallCodeBlock">
             ```
             {
               "total": 20,
               "returnedgroups": [
                 {
                   "name": "Defect",
                   "value": 5
                 },
                 {
                   "name": "Schedule",
                   "value": 3
                 },
                 {
                   "name": "Predictive",
                   "value": 2
                 },
                 {
                   "name": "Open",
                   "value": 7
                 },
                 {
                   "name": "Potential",
                   "value": 3
                 }
               ],
               "units": "count"
             }
             ```
             </div>
            </td>
            <td>
              - **Request:**
                  - The `must` member produces a *total result set* that includes **all** sample records.
                  - 2 `groups.cats` objects requesting a value breakdown for "requestType" and "status".
                  - Record quantities should be reported as a **count**.
              - **Response:**
                - The *total result set* includes 10 records:
                    - 5 have a *requestType* of "Defect', 3 of "Schedule", and 2 of "Predictive".
                    - 7 have a *status* of "Open", 3 of "Potential".
                - The `total` member's count of all records apportioned to each `returnedgroups` object is **twice** the quantity of records in the *total result set*.
            </td>
        </tr>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "must": [
                        {
                          "exists": {"field": "severity"}
                        }
                      ],
                      "groups": {
                        "cats": [
                          {
                            "field": "requestType"
                          },
                          {
                            "field": "status"
                          }
                        ],
                        "units": "percent"
                      }
                    }   
                    ```
               </div>
            </td>
            <td>
             <div class="smallCodeBlock">
             ```
             {
               "total": 20,
               "returnedgroups": [
                 {
                   "name": "Defect",
                   "value": 50
                 },
                 {
                   "name": "Schedule",
                   "value": 30
                 },
                 {
                   "name": "Predictive",
                   "value": 20
                 },
                 {
                   "name": "Open",
                   "value": 70
                 },
                 {
                   "name": "Potential",
                   "value": 30
                 },
               ],
               "units": "percent"
             }
             ```
             </div>
            </td>
            <td>
              - **Request:**
                  - The `must` member produces a *total result set* that includes **all** sample records.
                  - 2 `groups.cats` objects requesting a value breakdown for "requestType" and "status".
                  - Record quantities should be reported as a **Percent**.
              - **Response:**
                - The *total result set* includes 10 records:
                    - 50% have a *requestType* of "Defect', 30% of "Schedule", and 205 of "Predictive".
                    - 70% have a *status* of "Open", 30% of "Potential".
                - The `total` member's count of all records apportioned to each `returnedgroups` object is **twice** the quantity of records in the *total result set*.
            </td>
        </tr>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "must": [
                        {
                          "exists": {"field": "severity"}
                        }
                      ],
                      "groups": {
                        "cats": [
                          {
                            "field": "requestType",
                            "range": "gte": 0, "lte": 32,
                            "name": "High"
                          },
                          {
                            "field": "requestType",
                            "range": "gte": 33, "lte": 66,
                            "name": "Medium"
                          },
                          {
                            "field": "requestType",
                            "range": "gte": 67, "lte": 99,
                            "name": "Low"
                          }
                        ],
                        "units": "count"
                      }
                    }                    
                    ```
               </div>
            </td>
            <td>
             <div class="smallCodeBlock">
             ```
             {
               "total": 10,
               "returnedgroups": [
                 {
                   "name": "High",
                   "value": 5
                 },
                 {
                   "name": "Medium",
                   "value": 2
                 },
                 {
                   "name": "Low",
                   "value": 3
                 }
               ],
               "units": "count"
             }
             ```
             </div>
            </td>
            <td>
              - **Request:**
                  - The `must` member produces a *total result set* that includes **all** sample records.
                  - 3 `groups.cats` objects requesting different range groupings for *severity*.
                  - Record quantities should be reported as a **Count**.
              - **Response:**
                - The *total result set* includes 10 records:
                    - 5 have a *severity* between 0 and 32
                    - 2 have a *severity* between 33 and 66
                    - 3 have a *severity* between 67 and 99
                - The `total` member's count of all records apportioned to each `returnedgroups` object matches the quantity of records in the *total result set*.
            </td>
        </tr>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "must": [
                        {
                          "exists": {"field": "severity"}
                        }
                      ],
                      "groups": {
                        "cats": [
                          {
                            "field": "createdTime"
                            "range": {
                              "gte": "2024-09-01T00:00:00.000Z",
                              "lte": "2024-10-01T00:00:00.000Z"
                            },
                            "name": "September"
                          }
                        ],
                        "units": "count"
                      }
                    }                    
                    ```
               </div>
            </td>
            <td>
             <div class="smallCodeBlock">
             ```
             {
               "total": 4,
               "returnedgroups": [
                 {
                   "name": "September",
                   "value": 4
                 }
               ],
               "units": "count"
             }
             ```
             </div>
            </td>
            <td>
              - **Request:**
                  - The `must` member produces a *total result set* that includes **all** sample records.
                  - 1 `groups.cats` object requesting a range grouping for "createdTime".
                    - The *gte* lower limit refers to the start of September 1.
                    - The *lte* upper limit refers to the start of October 1.
                  - Record quantities should be reported as a **count**.
              - **Response:**
                - The *total result set* includes 10 records:
                    -  4 have a *createdTime* ocurring sometime in September 2024.
                - The `total` member's count of all records apportioned to the one `returnedgroups` object is only a **subset** of the quantity of records in the *total result set*.
            </td>
        </tr>
    </tbody>
</table>

<hr />

## 2.2.2 (GET/POST) queryLoc

This endpoint retrieves one or more records from the table specified in the path as a **GeoJSON** feature collection. The records retrieved are based on attribute filters and/or a geographic **bounding box** defined in the request, and is further restricted to retrieve only those records associated with an **active location** record. The response includes a GeoJSON feature collection containing one feature for each requested record. In each returned feature, the properties.data member defines a single JSON object whose members include populated attributes for that record.

This endpoint supports both the <span style={{ color: '#61affe', fontWeight: 'bold' }} >GET</span> and <span style={{ color: '#49cc90', fontWeight: 'bold' }}>POST</span> methods, which offer the same request options and use the same response format. The only difference between the two is whether you prefer to specify your request options as query parameters (GET) or as a JSON object in the request body (POST).

The following sections describe these operations in detail:

- [2.2.2.1 GET method](#2221-get-method)
- [2.2.2.2 POST method](#2222-post-method)
- [2.2.2.3 Request options](#2223-request-options)
- [2.2.2.4 Responses](#2224-responses)
- [2.2.2.5 Response GeoJSON Feature Collections](#2225-response-geojson-feature-collections)

### 2.2.2.1 GET method

<table class="fullTable">
    <col class="method" />
    <col />
    <tbody>
        <tr>
            <td class="getMethod">GET</td>
            <td class="getUrl">/query/\{subschema\}/\{table\}/loc</td>
        </tr>
    </tbody>
</table>

When submitting a request to the `/query/{subschema}/{table}/loc` endpoint using the **GET** method, you may include the following parameters. You should not supply any body.

<table class="fullTable">
    <col />
    <col />
    <col />
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>subschema<span style={{ color: '#FF0000' }}>*</span></td>
            <td>path</td>
            <td>
                An identifier for the subschema whose records you are requesting. This may be any of the values returned by the following CRUD API operation:

                <p class="code">GET /crud/refs?docref=prd.subschemas.json</p>
            </td>
        </tr>
        <tr>
            <td>table<span style={{ color: '#FF0000' }}>*</span></td>
            <td>path</td>
            <td>
                An identifier for the table whose records you are requesting. This may be any table with a **location** attribute, which you can identify using one of the values returned by the following CRUD API operation:

                <p class="code"> GET /crud/refs?docref=prd.\{subschema\}.tables.json</p>
            </td>
        </tr>
        <tr>
            <td>
                <p class="compacted">\{attribute\}</p>
                <p class="compacted">bbox</p>
                <p class="compacted">guids</p>
                <p class="compacted">scrollId</p>
                <p class="compacted">size</p>
                <p class="compacted">retrieveAll</p>
                <p class="compacted">fields</p>
            </td>
            <td>
                <p class="compacted">query</p>
                <p class="compacted">query</p>
                <p class="compacted">query</p>
                <p class="compacted">query</p>
                <p class="compacted">query</p>
                <p class="compacted">query</p>
                <p class="compacted">query</p>
            </td>
            <td style={{ verticalAlign: 'middle', textAlign: 'center'}}>See [2.2.2.3 Request options](#2223-request-options) below.</td>
        </tr>
    </tbody>
</table>

**Sample request URL:** The following request method and URL would return the first 50 records from the "work.tasks" table with a severity of either "3" or "4" located in a bounding box with a southwest long/lat of "-89.517883,38.520787" and northeast long/lat of "-88.28899,40.74577":

<p class="code">GET https://<span></span>mycompany.enterprise.com/query/work/tasks/loc?severity=3,4&bbox=-89.517883,38.520787,-88.28899,40.74577&retrieveAll=true&scrollId=0&size=50</p>

### 2.2.2.2 POST method

<table class="fullTable">
    <col class="method" />
    <col />
    <tbody>
        <tr>
            <td class="postMethod">POST</td>
            <td class="postUrl">/query/\{subschema\}/\{table\}/loc</td>
        </tr>
    </tbody>
</table>

When submitting a request to the `/query/{subschema}/{table}/loc` endpoint using the **POST** method, you must include the following parameters and body:

#### Parameters

<table class="fullTable">
    <col />
    <col />
    <col />
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>subschema<span style={{ color: '#FF0000' }}>*</span></td>
            <td>path</td>
            <td>
                An identifier for the subschema whose records you are requesting. This may be any of the values returned by the following CRUD API operation:

                <p class="code">GET /crud/refs?docref=prd.subschemas.json</p>
            </td>
        </tr>
        <tr>
            <td>table<span style={{ color: '#FF0000' }}>*</span></td>
            <td>path</td>
            <td>
                An identifier for the table whose records you are requesting. This may be any table with a **location** attribute, which you can identify using one of the values returned by the following CRUD API operation:

                <p class="code"> GET /crud/refs?docref=prd.\{subschema\}.tables.json</p>
            </td>
        </tr>
    </tbody>
</table>

**Sample request URL:** The following request method and URL would return records from the "work.tasks" table according to the options specified in the request body:

<p class="code">POST https://mycompany.enterprise.com/query/work/tasks/loc</p>

#### Body

```
{
    "{attribute}": [<value>, <value>],
    "bbox": [<SW_Longitude>,<SW_Latitude>,<NE_Longitude>,<NE_Latitude>],
    "guids": ["<GUID>", "<GUID>"],
    "scrollId": <integer>,
    "size": <integer>,
    "retrieveAll": <boolean>,
    "fields": ["<Attribute>","<Attribute>"]
}
```

The request body must include a JSON object defining your request options. All members are **optional**, but the request body must include **at least one member**.

See section [2.2.2.3 Request options](#2223-request-options) below for a description of each member you may include in this JSON object.


### 2.2.2.3 Request options

When submitting a request to the `/query/{subschema}/{table}/loc` endpoint, both the GET and POST methods may provide several options identifying the records you want to retrieve and specifying preferences for the response. Depending on the method, you should specify these options either as query parameters ([GET](#2221-get-method)) or as a JSON object in the request body ([POST](#2222-post-method)).

The following table describes each of the options your request may include.

:::important
Where any of the following members expect an **attribute**, you may typically include any attribute defined in the JSON Schema document for the table named in the request path. For information on schema documents, see <u>4.2 JSON Schema Documents</u>.

For general information on including attributes in Query API request bodies, see <u>4.4 Request JSON for Query API</u>.
:::

<table class="fullTable">
    <col style={{ width: '120px' }} />
    <col />
    <col />
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
    <tr id="reqloc_filtercrit">
        <td colspan="3">
            **Filter Criteria**

            The following options define filter criteria for a **total result set** of records from the specified table. In addition to these filter criteria options, the total result set for this endpoint is further restricted to include only those records associated with an **active location**. The response may include some or all of the records from the total result set, as determined by the [Scope](#reqloc_scope) options of the request.

            Your request may include any of the following Filter Criteria options, with the total result set consisting of only those records satisfying **all** included Filter Criteria options (i.e. they are evaluated as **AND** statements) that are also associated with an active location. If your request *excludes* all Filter Criteria options, then the total result set includes *every* available record from the specified table associated with an active location.
        </td>
    </tr>
    <tr id="reqloc_attribute">
        <td>\{attribute\}</td>
        <td>Array - \{type\}</td>
        <td>
            The request may include one or more \{attribute\} filter criteria, each testing whether a single attribute holds one of several supplied values. A given record is included in the total result set only if it returns true for **all** included \{attribute\} criteria. You may define \{attribute\} filter criteria for any text, enum, list, GUID, or date-time attribute defined in the JSON Schema for the applicable table. For more information on attribute data types, see <u>4.2 JSON Schema Documents</u>.

            For each included \{attribute\} criterion, a given record returns true if it **exactly** matches **any** one of the supplied values (i.e. evaluated as **OR**). For string values, the match is **case-sensitive**. For example, a value of "Blue" does NOT match "blue", "blueish", or "Blue sky".

            Depending on the method, each \{attribute\} criterion is defined in one of the following ways:

            - **GET:** Each criterion is a separate query parameter defined in standard URL query syntax as an attribute/value pair, with the valid values specified as a comma-separated list without quotation marks or formatting of any kind:
            <p class="code">\<Attribute\>=\<value\>,\<value\></p>
            - **POST:** Each criterion is a separate member with a *name* identifying a particular attribute, and a *value* specifying an array containing one or more possible values held by that attribute:
            <p class="code">"\<Attribute\>": [\<value\>,\<value\>]</p>
            
            For example, the following **\{attribute\}** filter criteria would return true for any asset record with an asset model of Battery AND a Manufacturer of either Acme or Cyberdyne:

            **GET**
            
            <p class="code">assetModel.assetModelId=Battery&manufacturer=Acme,Cyberdyne</p>
            
            **POST**
            
            <p class="code">"assetModel.assetModelId": ["Battery"],</p>
            <p class="code">"manufacturer": ["Acme","Cyberdyne"]</p>
        </td>
    </tr>
        <td>bbox</td>
        <td>Array - Decimal</td>
        <td>
            Four decimal values specifying latitude and longitude coordinates for the **southwest and northeast** corners of a bounding box. In order to be included in the total result set, a record must be associated with an active **location** record with at least one set of coordinates that fall **on or inside** the resulting boundaries of this box.

            The values defining the bounding box corners must be specified as **decimal degree** longitude and latitude coordinates in the following sequence:

            <p class="code">\<SW_Longitude\>,\<SW_Latitude\>,\<NE_Longitude\>,\<NE_Latitude\></p>

            The *bbox* filter criterion is tested against each record's `location.geometry` array and applies to locations using *any* geometry type (i.e. Point, Linear, or Area). The *bbox* filter criterion is satisfied as long as **at least one** object in the **geometry** array defines a point **on or inside** the boundary box.

            For example, if you wanted to define a bounding box with a southwest corner lat/long of "44.99898, -123.00367" and a northeast corner lat/long of "45.00083, -122.99726", you would supply the following *bbox* criterion (note the **reversal** of the more common "lat/long" pattern to "long/lat"):

            - **GET:**
            <p class="code">bbox=-123.00367,44.99898,-122.99726,45.00083</p>

            - **POST:**
            <p class="code">"bbox": [-123.00367,44.99898,-122.99726,45.00083]</p>
            
            The following diagram depicts the resulting bounding box (dashed-line) and several Location records defined with geometries of Point (Loc 2,3,4,6,8), Linear (Loc 5,9), and Area (Loc 1,7). Any records associated with Loc 1, 2, 3, 4, or 5 would satisfy this *bbox*. Any records associated with Loc 6, 7, 8, or 9 would *not* satisfy this *bbox*.
            
            <img src={require('./bboxSample.png').default} alt="Sample Bounding Box" loading="lazy" border="1px solid #000000" />
        </td>
    <tr>
    </tr>
    <tr id="reqloc_scope">
        <td colspan="3">
            **Scope**

            The following options determine the **returned result set** of records included in the response by limiting the total result set determined by the [Filter Criteria](#reqloc_filtercrit) options. In summary, the `scrollId` option specifies a starting point from the top of the total result set (zero-indexed); the `size` option determines the maximum quantity of records to return in the response *beginning* from this starting point; and the `retrieveAll` option determines whether the response includes a "scrollId" member indicating the next record not yet retrieved from the total result set. If your request excludes all Scope options, then the response includes every record from the total result set up to a maximum limit of **10,000 records**, returned in no particular sequence.

            The most common reason for including the Scope options is when you need to retrieve **large data sets** in manageable chunks over the course of several requests. In this scenario, your first request retrieves the maximum allowed quantity of records stated in the request's size option, indicating that the total result set may contain more records not yet retrieved. Subsequent requests could then proceed to retrieve the remaining records, each beginning from where the previous request left-off (as indicated by the JSON `scrollId` member of the last response). This functionality is especially useful if your total result set exceeds 10,000 records, as the Query API has a maximum retrieval cap of 10,000 records at a time.

            For example, consider a situation in which your Filter Criteria options define a total result set of 25,000 records and assume `retrieveAll` is set to 'true' for all requests. Your first request would supply a `scrollId` of '0' and a size of '10000', and the response would include the first 10k records from the entire set of 25k, along with a "scrollId" member stating '10000'. Your second request would supply a `scrollId` of '10000' and a size of '10000', and the response would include the next 10k records from the entire set, along with a "scrollId" member stating '20000'. Your final request would supply a `scrollId` of '20000' and a size of '5000', and the response would include the last 5k records.
        </td>
    </tr>
    <tr>
        <td>scrollId</td>
        <td>Integer</td>
        <td>
            An integer specifying the starting point in the *total result set* from which to retrieve the quantity of records specified in the `size` option for inclusion in the *returned result set*. This integer represents a zero-indexed sequence position in a list of records from the total result set, counting from the top of the list. The total result set is not sorted in any particular order, but a given set of Filter Criteria will always return records in the same sequence.

            For example, a `scrollId` of '0' will retrieve the very 1st record in the total result set and downwards. A `scrollId` of '5' will retrieve the 6th record and downwards.

            If excluded, `scrollId` is set to 0 by default.

            Examples:

            - **GET:**
                <p class="code">scrollID=5</p>
            - **POST:**
                <p class="code">"scrollID": 5</p>
        </td>
    </tr>
    <tr>
        <td>size</td>
        <td>Integer</td>
        <td>
            An integer from 1-1000 indicating the maximum quantity of records from the *total result set* to include in the *returned result set*, retrieved beginning from the starting point specified in the `scrollId` option. A `size` larger than the total result set will retrieve all records from the total result set.

            For example, a `scrollId` of '0' and a `size` of '10' will retrieve records 1-10 from the top of the total result set. A `scrollId` of '5' and a `size` of '20' will retrieve records 6-25.

            If excluded, `size` is set to 10000 by default.

            Examples:

            - **GET:**
                <p class="code">size=20</p>
            - **POST:**
                <p class="code">"size": 20</p>

        </td>
    </tr>
    <tr>
        <td>retrieveAll</td>
        <td>Boolean</td>
        <td>
            A boolean value determining whether the **response** includes a "scrollId" member indicating the sum of the **request's** `scrollId` and the quantity of records included in the returned result set.

            This is usually only needed when retrieving a large total result set over multiple requests. Effectively, the response's "scrollId" member indicates the next record not yet retrieved from the total result set, which you would then supply in the `scrollId` of your next request.

            Set the `retrieveAll` option to *true* to include the "scrollId" member in the response, or *false* to exclude the "scrollId" member. If `retrieveAll` is excluded from the request, it is set to *false* by default.

            Examples:

            - **GET:**
                <p class="code">retrieveAll=true</p>
            - **POST:**
                <p class="code">"retrieveAll": true</p>
        </td>
    </tr>
    <tr>
        <td colspan="3">
            **Response Tuning**

            The following option determines the details provided for each record in the returned result set determined by the [Scope](#reqloc_scope) options. This option does NOT impact *which* records are returned in the response.
        </td>
    </tr>
    <tr id="reqloc_fields">
        <td>fields</td>
        <td>Array - String</td>
        <td>
            A list of attribute names determining which attributes are included for each record returned in the response. This list is not bound by the [\{attribute\}](#reqloc_attribute) filter criteria and may include entirely different attributes if you wish. The sequence in which attributes are listed in the `fields` option does not impact the result.
            
            For each applicable record, the response includes only those attributes specified in the `fields` option that **also** have a **currently defined value**. Any attributes that are null for a particular record (i.e. no defined value) are excluded in the response for that record.

            If `fields` is excluded from the request, the response includes all populated attributes for each applicable record.

            Examples:

            - **GET:**
                <p class="code">fields=taskId,name,taskModel</p>
            - **POST:**
                <p class="code">"fields": ["taskId","name","taskModel"]</p>
            
            :::note
            Regardless of the `fields` options, the response **always** includes the **location** attribute for each applicable record.
            :::
        </td>
    </tr>
    </tbody>
</table>


### 2.2.2.4 Responses

<table class="fullTable">
    <col />
    <col />
    <thead>
        <tr>
            <th>Code</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>200</td>
            <td>
                **OK**

                Success. The response body contains a JSON object including the following members:

                <div class="smallCodeBlock">
                ```
                {
                    "features": {<FeatureCollection>},
                    "total": <integer>,
                    "eptime": <integer>,
                    "scrollId": <integer>
                }
                ```
                </div>

                - **features:** An object defining a GeoJSON feature collection containing one feature for each record included in the **returned result set** determined by the request's [Scope](#reqloc_scope) options. This may only be a subset of the records included in the *total result set* determined by the request's [Filter Criteria](#reqloc_filtercrit) options.

                    The `features` object is described in section [2.2.2.5 Response GeoJSON Feature Collections](#2225-response-geojson-feature-collections) below.

                - **total:** An integer indicating the quantity of records included in the **returned result set** included in the response's `features` object, as determined by the request's [Scope](#reqloc_scope) options. This may be different from the quantity of records included in the total result set determined by the request's [Filter Criteria](#reqloc_filtercrit) options.

                    If the response's `total` value is identical to the request's size option, this may indicate that the total result set contains more records not yet retrieved.
                
                - **eptime:** An integer indicating the Unix epoch time at which the response was sent by PRODUCT.

                - **scrollId:** If present, this is an integer indicating the sum of the request's `scrollId` option and the quantity of records included in the *returned result set*. The "scrollId" member is only included in the response if the `retrieveAll` request option was set to true.

                    This value is typically only needed when retrieving a large total result set over multiple requests. Effectively, it indicates the next record not yet retrieved from the *total result set*, which you would then supply in the `scrollId` of your next request.
            </td>
        </tr>
        <tr>
            <td>400</td>
            <td>
                **Bad Request**

                Unsuccessful. This may indicate a problem with your request body or parameters, or that the request table does not have a "location" attribute.

                Body or parameter issues may include a missing or unrecognized member, attribute, or parameter; a data type mismatch; a JSON syntax error (e.g. missing comma or brace); or a problem with your *bbox* value, such as an out of range latitude or longitude value. The response body typically provides additional details.
            </td>
        </tr>
        <tr>
            <td>401</td>
            <td>
                **Unauthorized**

                Unsuccessful. The request did not supply a valid JWT bearer token. The response body typically provides additional details. For information on user authentication, see <u>2.1 REST Communication Requirements</u>.
            </td>
        </tr>
        <tr>
            <td>403</td>
            <td>
                **Forbidden**

                Unsuccessful. This may indicate either of the following problems with your request:

                - The subschema or table named in the path does not exist or was misspelled. To obtain a list of valid subschema and table identifiers, use the following CRUD API operations:
                <p class="code">GET /crud/refs?docref=prd.subschemas.json</p>
                <p class="code">GET /crud/refs?docref=prd.\{subschema\}.tables.json</p>
                - The user associated with the supplied JWT token does not have access to the table named in the path. For information on user authorization, see <u>2.1 REST Communication Requirements</u>.
            </td>
        </tr>
        <tr>
            <td>404</td>
            <td>
                **Not Found**

                Unsuccessful. This may indicate that the endpoint specified in the path does not exist or was misspelled.                
            </td>
        </tr>
        <tr>
            <td>500</td>
            <td>
                **Internal Server Error**

                Unsuccessful. For requests using the POST method, this error is returned if your request failed to include any body or it may indicate a problem with an internal PRODUCT system component.
            </td>
        </tr>
    </tbody>
</table>

### 2.2.2.5 Response GeoJSON Feature Collections

Successful responses for this endpoint will return the requested records as a GeoJSON feature collection. A GeoJSON feature collection defines data for one or more objects, referred to as ‘features’ in the GeoJSON format, each of which is identified as a particular geometry type (Point, LineString, Polygon). Each record is returned as either a Point, LineString, or Polygon GeoJSON feature based on its associated *location*. Each location record may specify a geometry *Type* and one or more sets of coordinates, from which any records associated with that location derive their GeoJSON feature "geometry".

The following Web sites provide full details about the GeoJSON format and its formal specification, respectively:

<p class="code">[https://geojson.org/](https://geojson.org/)</p>
<p class="code">[https://tools.ietf.org/html/rfc7946](https://tools.ietf.org/html/rfc7946)</p>

In the response body, the top-level `features` member defines an object containing a GeoJSON feature collection adhering to the following format:

```
"features": {
    "features": [
        {
            "geometry": {
                "isRealtime": <boolean>,
                "coordinates": [<Long/Lat_CoordinateSets>],
                "type": "<Point/LineString/Polygon>"
            },
            "id": <GUID>,
            "type": "Feature",
            "properties": {
                "data": {<Record>}
            }
        },
        ...
        ],
    "type": "FeatureCollection"
}
```
The `features.features` array contains one object for each record included in the **returned result set** determined by the request's [Scope](#reqloc_scope) options. Each such object contains the following members defining a GeoJSON feature corresponding to a single record.

- **geometry:** This object uses the following child members to describe the GeoJSON feature's geometric properties:
    - **isRealtime:** Not currently for external use.
    - **coordinates:** An array defining one or more sets of longitude and latitude coordinates in decimal degree format. All coordinate sets specify **longitude first**, followed by latitude. These values are translated from the corresponding record's `location.geometry` array.

        Points will specify only a single position; LineStrings will specify an array of positions; Polygons will specify an array of “linear ring” arrays. Refer to the full GeoJSON specification for details.
    - **type:** The geometry type of the feature, which will be one of **Point**, **LineString**, or **Polygon**. This value is translated from the corresponding record's `location.GIS.type` attribute, which uses the analogous values of *Point*, *Linear*, and *Area*, respectively.
- **id:** The **GUID** of the corresponding PRODUCT record on which the feature is based. This is the GUID of the requested record itself, not its associated location record. For information on the different types of PRODUCT record identifiers, see <u>1.2 Record and System Identifiers</u>.
- **properties.data:** An object containing all populated attributes from the corresponding record that were specified in the request's [fields](#reqloc_fields) option, plus the *location* attribute which is always included. If the *fields* option was excluded from the request, then the object includes *all* populated attributes. For details on the content of JSON objects included in Query API response bodies, see <u>4.5 Response JSON</u>.

<hr />

## 2.2.3 Query Criteria

<div class="smallCode">
```
{
    "filters": {
        "<Attribute>": <value>, "<Attribute>": <value>
    },
    "wildcard": {
        "<Attribute>": "<value>", "<Attribute>": "<value>"
    },
    "must": [
        {<term/terms/exists/wildcard/range/must/must_not/should>},
        {<term/terms/exists/wildcard/range/must/must_not/should>}
    ],
    "must_not": [
        {<term/terms/exists/wildcard/range/must/must_not/should>},
        {<term/terms/exists/wildcard/range/must/must_not/should>}
    ],
    "should": [
        {<term/terms/must/must_not/should>},
        {<term/terms/must/must_not/should>}
    ],
    ...
}
```
</div>

In some Query API operations, the request body may include one or more "Query Criteria" members used to establish a **total result set** of records from a particular table. Each Query Criteria member defines a different kind of test that returns either *true* or *false* for that member as a whole. A given request's total result set consists of only those records that return *true* for **all** included top-level Query Criteria members (i.e. they are evaluated as **AND** statements). If a request **excludes all** Query Criteria members, then the total result set includes **every** available record from the specified table.

There are 3 categories of Query Criteria members that you may include in your request body:

- [2.2.3.1 Standalone clauses (filters/wildcard)](#2231-standalone-clauses-filterswildcard)
- [2.2.3.2 Compound clauses (must/must_not/should)](#2232-compound-clauses-mustmust_notshould)
- [2.2.3.3 Leaf clauses (term/terms/exists/wildcard/range)](#2233-leaf-clauses-termtermsexistswildcardrange)

:::important
Where any of the following members expect an **attribute**, you may typically include any attribute defined in the JSON Schema document for the table named in the request path. For information on schema documents, see <u>4.2 JSON Schema Documents</u>.

For general information on including attributes in Query API request bodies, see <u>4.4 Request JSON for Query API</u>.
:::

### 2.2.3.1 Standalone clauses (filters/wildcard)
A standalone clause defines a single object containing one or more members specifying a test for your record data. These tests return either *true* or *false* for the standalone clause as a whole. Standalone clauses may exist only at the **top-level** of the request, and cannot themselves contain other types of clauses.

Your request body may include any of the following standalone clauses:
- ['filters' standalone clause](#filters-standalone-clause)
- ['wildcard' standalone clause](#wildcard-standalone-clause)

:::note
The *filters* and *must* clauses provide similar functionality, but differ in their available test criteria. In terms of exclusive functionality, the *must* member may include clauses for text-searching (wildcard) and null-checking (exists).
:::

#### 'filters' standalone clause
<p class="indent1">`"filters": { "<Attribute>": <value>, "<Attribute>": <value> }`</p>

The `filters` standalone clause defines criteria that a record **must** meet in order to be included in the total result set. The `filters` object may include one or more members, each defining a test for a single attribute that must return **true**. These tests are evaluated as **AND** statements, meaning a given record returns true for the `filters` standalone clause only if **all** of its child members return true.

Each `filters` child member must specify a *name* identifying a particular attribute and a *value* specifying one or more possible values held by that attribute. A given record returns true for that member if it **exactly** matches any of the supplied values. For string values, the match is **case-sensitive**.

Depending on the attribute's data type, you may specify each member's value criteria as one of the following:

- **Single value:** You may specify a single value that a record must match exactly. For example:
    <p class="indent1">`"description": "Blue"`</p>
    <p class="indent2">– or –</p>
    <p class="indent1">`"severity": 3`</p>

- **Array:** You may specify an array containing multiple values, and a record may match any one of the supplied values (i.e. evaluated as **OR**). For example:

    <p class="indent1">`"description" : [ "Blue", "blue", "BLUE" ]`</p>
    <p class="indent2">– or –</p>
    <p class="indent1">`"severity": [ 2, 3 ]`</p>

- **Range:** For date-time and numeric attributes only, you may specify an object defining upper and/or lower range limits according to the following format:
    <p class="indent1">`{"range": {"<LowerOperator>": <LowerLimit>, "<UpperOperator>": <UpperLimit>}}`</p>

    Your \<LowerOperator\> may be either "**gt**" (greater than) or "**gte**" (greater than or equals), and your \<UpperOperator\> may be either "**lt**" (less than) or "**lte**" (less than or equals). You may choose to include both an upper and lower range limit; only an upper limit; or only a lower limit. For example:

        <p class="indent1">`"createdTime": {"range": {"gte": "2024-04-22T00:00:00.000Z", "lte": "2024-04-23T23:59:59.999Z"}}`</p>
        <p class="indent2">– or –</p>
        <p class="indent1">`"severity": { "range": {"lt": 3} }`</p>

:::tip[Examples]
- Returns true for records with a *description* of "Blue" (but NOT "blue", "blueish", or "Blue sky"):
    ```
    "filters": { "description": "Blue" }
    ```

- Returns true for records with a *severity* less than 3 AND a *description* of "Blue", "blue", or "BLUE" (but NOT "blueish" or "Blue sky"):

    ```
    "filters": {
        "severity": { "range": {"lt": 3} },
        "description" : [ "Blue", "blue", "BLUE" ]
    }
    ```
:::

#### 'wildcard' standalone clause
<p class="indent1">`"wildcard": { "<Attribute>": "<value>", "<Attribute>": "<value>" }`</p>

The *wildcard* standalone clause defines a set of one or more **partial text-search** operations from which a record must match **at least one** in order to be included in the total result set. The wildcard object may include one or more members, each defining a search string for a single attribute. These members are evaluated as **OR** statements, meaning a given record returns true for the *wildcard* standalone clause if **ANY** of its child members find a match.

Each *wildcard* child member must specify a name identifying a particular text attribute, and a value specifying a search string. The search is **case-insensitive** and supports partial **substring** matches, but actual wildcard characters are not supported. You may search on any text, enum, list, or GUID attribute defined in the JSON Schema for the applicable table. For more information on attribute data types, see <u>4.2 JSON Schema Documents</u>.

:::tip[Examples]
- Returns true for records with a *description* of "blue", "Blue", and "thisisblueish":
    ```
    "wildcard": {"description": "blue"}
    ```
- Returns true for records with a *scheduleState* of "Confirmed" **OR** a *description* of "blue", "Blue", and "thisisblueish":
    ```
    "wildcard": {
        "scheduled": "confirm",
        "description": "blue"
    }
    ```
:::

:::important
The *wildcard* standalone clause behaves **differently** from the "wildcard" **leaf clause** used in the *must/must_not* compound clauses, which is described in section [2.2.3.3 Leaf clauses](#2233-leaf-clauses-termtermsexistswildcardrange) below. Effectively, the wildcard *standalone* clause always implicitly adds asterisk (*) wildcards to the beginning and end of the supplied search term.
:::

### 2.2.3.2 Compound clauses (must/must_not/should)
Compound clauses are primarily wrappers for interpreting the results of [leaf clauses](#2233-leaf-clauses-termtermsexistswildcardrange), which specify the actual tests for your record data. A compound clause defines an array containing one or more objects, each representing either a *leaf* clause or another *compound* clause. A given compound clause itself returns either *true* or *false* based on how it interprets the boolean values returned by its child objects.

Compound clauses can be structured **hierarchically**, with one compound clause containing other child compound clauses. This hierarchy can extend many levels deep, but the lowest level of each branch always includes at least one leaf clause performing an actual test on record data. For more information on compound clause hierarchy, see section [2.2.3.4 Hierarchical queries](#2234-hierarchical-queries).

Your request body may include any of the following compound clauses:
- ['must' compound clause](#must-compound-clause)
- ['must_not' compound clause](#must_not-compound-clause)
- ['should' compound clause](#should-compound-clause)

#### 'must' compound clause
<div class="indent1">
```
"must": [
    {<term/terms/exists/wildcard/range/must/must_not/should>},
    {<term/terms/exists/wildcard/range/must/must_not/should>}
]
```
</div>

A *must* compound clause defines criteria that a record **must** meet in order to be included in the total result set. The `must` array may include one or more objects, each defining a separate *leaf* or *compound* clause that must return **true**. These clauses are evaluated as **AND** statements, meaning a given record returns true for a *must* clause only if **all** of its child clauses return true.

A *must* clause may include any of the following leaf clauses in any combination or quantity, each of which are described below in section [2.2.3.3 Leaf clauses](#2233-leaf-clauses-termtermsexistswildcardrange) below:

<p class="code">term; terms; exists; wildcard; range</p>

#### 'must_not' compound clause
<div class="indent1">
```
"must_not": [
    {<term/terms/exists/wildcard/range/must/must_not/should>},
    {<term/terms/exists/wildcard/range/must/must_not/should>}
]
```
</div>

A *must_not* compound clause defines criteria that a record **must NOT** meet in order to be included in the total result set. The `must_not` array may include one or more objects, each defining a separate *leaf* or *compound* clause that must return **false**. These clauses are evaluated as **AND** statements, meaning a given record returns true for a *must_not* clause only if **all** of its child clauses return false.

A must_not clause may include any of the following leaf clauses in any combination or quantity, each of which are described below in section [2.2.3.3 Leaf clauses](#2233-leaf-clauses-termtermsexistswildcardrange) below:

<p class="code">term; terms; exists; wildcard; range</p>

#### 'should' compound clause
<div class="indent1">
```
"should": [
    {<term/terms/must/must_not/should>},
    {<term/terms/must/must_not/should>}
]
```
</div>

A *should* compound clause defines a set of two or more clauses from which a record must meet **at least one** in order to be included in the result set. The `should` array may include two or more objects, each defining a separate *leaf* or *compound* clause. These clauses are evaluated as **OR** statements, meaning a given record returns true for a *should* clause if **ANY** of its child clauses return **true**.

A should clause may include any of the following leaf clauses in any combination or quantity, each of which are described below in section [2.2.3.3 Leaf clauses](#2233-leaf-clauses-termtermsexistswildcardrange) below:

<p class="code">term; terms</p>

### 2.2.3.3 Leaf clauses (term/terms/exists/wildcard/range)
<div class="smallCode">
```
"<must/must_not/should>": [
{
    "term": { "<Attribute>": <value> }
    },
    {
        "terms": { "<Attribute>": [<value>, <value>] }
    },
    {
        "exists": { "field": "<Attribute>" }
    },
    {
        "wildcard": { "<Attribute>.keyword": {"value": "<*value*>"} }
    },
    {
        "range": { "<Attribute>": {"<LowerOperator>": <LowerLimit>} }
    }
]
```
</div>

A leaf clause may exist only within an object of a [compound clause](#2232-compound-clauses-mustmust_notshould) array. Each leaf clause defines an object containing a single member specifying a test for your record data that returns either *true* or *false* to its parent compound clause. Each type of compound clause supports only certain leaf clauses in its array, and interprets the boolean values returned by its child clauses differently.

All compound clauses may include their supported leaf clauses in any combination or quantity (e.g. 1 "term" clause; 2 "term" and 1 "exists"; etc), but each leaf clause must exist within a **separate object**. Combining multiple leaf clauses in a single object may have unpredictable results, especially for the should array.

For example, the following table illustrates two *should* arrays, one of which is valid, the other invalid:

<table>
    <col />
    <col />
    <thead>
        <th>Valid</th>
        <th>Invalid</th>
    </thead>
    <tbody>
        <tr>
            <td>
            <div class="smallCodeBlock">
            ```
            "should": [
                {
                    "term": { "assetWork": true }
                },
                {
                    "term": { "severity": 2 }
                }
            ]
            ```
            </div>
            </td>
            <td>
            <div class="smallCodeBlock">
            ```
            "should": [
                {
                    "term": { "assetWork": true },
                    "term": { "severity": 2 }
                }
            ]
            ```
            </div>
            </td>
        </tr>
    </tbody>
</table>

A given compound clause may be able to include any of the following leaf clauses :
- ['term' leaf clause](#term-leaf-clause)
- ['terms' leaf clause](#terms-leaf-clause)
- ['exists' leaf clause](#exists-leaf-clause)
- ['wildcard' leaf clause](#wildcard-leaf-clause)
- ['range' leaf clause](#range-leaf-clause)

#### 'term' leaf clause
<p class="indent1">`"term": { "<Attribute>": <value> }`</p>

**Used in:** must; must_not; should

A *term* leaf clause tests whether a single attribute holds a **single specific value**. The `term` object must contain one member with a *name* identifying a particular attribute, and a *value* specifying a single value possibly held by that attribute.

A given record returns true for a *term* leaf clause if it **exactly** matches the supplied value. For string values, the match is **case-sensitive**.

:::tip[Examples]
- Returns true for records with a *description* of "Blue", but **NOT** "blue", "blueish", or "Blue sky":
    ```
    "term": { "description": "blue" }
    ```
- Returns true for records with a *severity* of 4:
    ```
    "term": { "severity": 4 }
    ```
:::

#### 'terms' leaf clause
<p class="indent1">`"terms": { "<Attribute>": [<value>, <value>}]`</p>

**Used in:** must; must_not; should

A *terms* leaf clause tests whether a single attribute holds **one of several** supplied values. The `terms` object must contain one member with a *name* identifying a particular attribute, and a *value* specifying an array containing one or more possible values held by that attribute.

A given record returns true for a *terms* leaf clause if it **exactly** matches **any** one of the supplied values (i.e. evaluated as **OR**). For string values, the match is **case-sensitive**.

:::tip[Examples]
- Returns true for records with a *description* either "Blue" OR "blue", but **NOT** "blueish", or "Blue sky":
    ```
    "terms": { "description": ["Blue", "blue"] }
    ```
- Returns true for records with a *severity* of either 2 **OR** 3:
    ```
    "terms": { "severity": [2, 3] }
    ```
:::

#### 'exists' leaf clause
<p class="indent1">`"exists": { "field": "<Attribute>" }`</p>

**Used in:** must; must_not

An *exists* leaf clause tests whether a single attribute has a **currently defined value**. The `exists` object must contain one member with a *name* of "field", and a *value* identifying a particular attribute.

A given record returns true for an *exists* leaf clause if it currently has **any defined value**, even a blank value (i.e. ""). An *exists* clause returns false only if the applicable attribute is currently **null**.

:::tip[Examples]
- Returns true for records with a defined *description* value:
    ```
    "exists": { "field": "description" }
    ```
:::

#### 'wildcard' leaf clause
<p class="indent1">`"wildcard": { "<Attribute>.keyword": {"value": "<*value*>"} }`</p>

**Used in:** must; must_not

A *wildcard* leaf clause performs a **wildcard text-search operation** on a single attribute. The `wildcard` object must contain one member with a *name* identifying a particular attribute followed by a suffix of **".keyword"**, and a *value* defining another object. This nested object must contain one member with a *name* of **"value"**, and a *value* specifying a wildcard (*) supported search string. You may search on any text, enum, list, or GUID attribute defined in the JSON Schema for the applicable table. You may also search on array attributes containing values of these same data types, including nested attributes of object arrays. For more information on attribute data types, see <u>4.2 JSON Schema Documents</u>.

A given record returns true for a *wildcard* leaf clause if it matches the supplied value. The match is **case-insensitive** and your search string may include any number of **asterisk (\*)** characters as wildcards, each matching **zero or more** characters. If your search string *excludes* asterisk wildcards, then the search string must *exactly* match the attribute's entire value, except for casing.

When searching on array attributes, a record returns true if *any* member of the array matches the supplied value. If searching on an array attribute that defines objects with child members, then you must identify a specific object member on which to search. For example, in the equipment table, the "part" array defines objects with the members "partNum", "sequence", and "manufacturer". You cannot define a wildcard search for "part" as a whole, but you *are* permitted to search on "part.manufacturer".

:::tip[Examples]
- Returns true for records with a *description* of "blue", "Blue", or "thisisblueish":
    ```
    "wildcard": {"description.keyword": {"value": "*blue*"} }
    ```
- *(No wildcard \* chars)* Returns true for records with a description of "blue" or "Blue", but NOT "thisisblueish":
    ```
    "wildcard": {"description.keyword": {"value": "blue"} }
    ```
- Returns true for records with a *description* of "This was a sunny day!" or "This was a cloudy day.":
    ```
    "wildcard": {"description.keyword": {"value": "blue"} }
    ```
- Returns true for records where any object in the *part* array has a *manufacturer* starting with "general":
    ```
    "wildcard": {"description.keyword": {"value": "blue"} }
    ```
:::

:::note
The *wildcard* leaf clause behaves very **differently** from the "wildcard" **standalone clause**, which is described in section [2.2.3.1 Standalone clauses](#2231-standalone-clauses-filterswildcard) above. Effectively, the wildcard *standalone* clause always implicitly adds asterisk (\*) wildcards to the beginning and end of the supplied search term.
:::

#### 'range' leaf clause

<p class="indent1">`"range": { "<Attribute>": {"<LowerOperator>": <LowerLimit>, "<UpperOperator>": <UpperLimit>} }`</p>

**Used in:** must; must_not

A *range* leaf clause tests whether a single **date-time or numeric** attribute holds a **value within a specified range**. The `range` object must contain one member with a *name* identifying a particular date-time or numeric attribute, and a *value* defining another object. This nested object must contain one member specifying upper and/or lower range limits, where:

- Your **\<LowerOperator\>** may be either "gt" (greater than) or "gte" (greater than or equals), and your **\<UpperOperator\>** may be either "lt" (less than) or "lte" (less than or equals).

    You may choose to include both an upper and lower range limit; only an upper limit; or only a lower limit.

- Your **\<LowerLimit\>** and/or **\<UpperLimit\>** must specify a single decimal, integer, or date-time value, as applicable to the *\<Attribute\>*.

A given record returns true for a *range* leaf clause if it falls within the specified upper and/or lower range limits.

:::tip[Examples]
- Returns true for records with a *severity* greater than 4:
    ```
    "range": { "severity": {"gt: 4"} }
    ```
- Returns true for records with a *createdTime* occurring any time on April 22, 23, or 24:
    ```
    "range": { "createdTime": {"gte": "2024-04-22T00:00:00.000Z", "lte": "2024-04-24T23:59:59.999Z"} }
    ```
- *("/chart" endpoint only)* Returns true for records with a *createdTime* occurring during the previous calendar month:
    ```
    "range": { "createdTime": {"gte": "now/M-1M", "lte": "now/M"} }
    ```
:::

### 2.2.3.4 Hierarchical queries

[Compound clauses](#2232-compound-clauses-mustmust_notshould) can be structured **hierarchically**, with one compound clause containing other child compound clauses. This hierarchy can extend many levels deep, but the lowest level of each branch always includes at least one [leaf clause](#2233-leaf-clauses-termtermsexistswildcardrange) performing an actual test on record data.

In hierarchical queries, each compound clause treats its child leaf and compound clauses exactly the same, evaluating only the boolean values returned by its own direct children regardless of clause type. For each branch of hierarchy, boolean values are returned upwards from the lowest-level leaf clauses to their parent compound clauses, with each compound clause then itself returning either true or false based on how it interprets those results. This process continues upwards until the branch's top-level compound clause is reached, which must always return true in order for a given record to be included in the total result set.

Consider the following sample hierarchical queries:

<table class="fullTable">
    <col />
    <col />
    <thead>
        <th>Request Body</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
        <td>
            <div class="smallCodeBlock">
                ```
                {
                  "should": [
                    {
                      "must": [
                        { "term": { "initiationType": "RequestForWork" } },
                        { "term": { "severity": 4 } }
                      ]
                    },
                    {
                      "must": [
                        { "term": { "scheduleState": "Prelim" } },
                        { "term": { "status": "Potential" } }
                      ]
                    }
                  ]
                }
                ```
            </div>
        </td>
        <td>
            **Case 1:** A top-level "should" compound clause enclosing two "must" compound clauses.

            The total result set includes any record that meets **EITHER** of the following sets of criteria:

            - An *initiationType* of "RequestForWork" AND a *severity* of 4.

            - A *scheduleState* of "Prelim" AND a *status* of "Potential".
        </td>
        </tr>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "must": [
                        { "term": { "assetWork": false } },
                        {
                          "should": [
                            {
                              "must": [
                                { "term": { "initiationType": "RequestForWork" } },
                                { "term": { "severity": 4 } }
                              ]
                            },
                            {
                              "must": [
                                { "term": { "scheduleState": "Prelim" } },
                                { "term": { "status": "Potential" } }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                    ```
                </div>
            </td>
            <td>
                **Case 2:** A top-level "must" compound clause enclosing both a "term" leaf clause and a "should" compound clause (same *should* as Case 1).

                The total result set includes any record that meets **ALL** of the following criteria:

                - The record has an *assetWork* of false.

                - The record meets **EITHER** of the following sets of criteria:

                    - An *initiationType* of "RequestForWork" AND a *severity* of 4.

                    - A *scheduleState* of "Prelim" AND a *status* of "Potential".
            </td>
        </tr>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "filters": {
                        "createdTime": {
                          "range": {
                            "gte": "2024-11-01T00:00:00.000Z",
                            "lte": "2024-11-01T23:59:59.999Z"
                          }
                        }
                      },
                      "must": [
                        { "term": { "assetWork": false } },
                        {
                        "should": [
                          {
                            "must": [
                              { "term": { "initiationType": "RequestForWork" } },
                              { "term": { "severity": 4 } }
                            ]
                          },
                          {
                            "must": [
                              { "term": { "scheduleState": "Prelim" } },
                              { "term": { "status": "Potential" } }
                            ]
                          }
                        ]
                        }
                      ]
                    }
                    ```
                </div>
            </td>
            <td>
                **Case 3:** A top-level "filters" standalone clause and a top-level "must" compound clause (same *must* as Case 2).

                The total result set includes any record that meets **ALL** of the following criteria:

                - The record was created on November 1, 2024.

                - The record has an *assetWork* of false.

                - The record meets **EITHER** of the following sets of criteria:

                    - An *initiationType* of "RequestForWork" AND a *severity* of 4.

                    - A *scheduleState* of "Prelim" AND a *status* of "Potential".
            </td>            
        </tr>
        <tr>
            <td>
                <div class="smallCodeBlock">
                    ```
                    {
                      "must": [
                        { "term": { "assetWork": false } },
                        {
                          "must": [
                            { "term": { "severity": 4 } },
                            {
                              "must": [
                                { "term": { "status": "Potential" } }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                    ```
                </div>
            </td>
            <td>
                **Case 4:** A top-level "must" compound clause, which encloses a 2nd lvl "must", which encloses a 3rd lvl "must".

                The total result set includes any record that meets **ALL** of the following criteria:
                
                - The record has an *assetWork* of false.
                
                - The record has a *severity* of 4.
                
                - The record has a *status* of "Potential".

            </td>
        </tr>
    </tbody>
</table>
