# p2-e-commerce-server - Career Portal Server

Career Portal server is an hiring portal for candidates to find career and companies to hire the right talent.
This server has :
 - REST API endpoint for main assets' CRUD operation.
 - Response in JSON format.

&nbsp;

---
## REST API End Points

List of available endpoints: 

- `POST /login`
- `POST /register`

Routes that need authentication:

- `GET /jobs`
- `POST /jobs`
- `GET /jobs:id`
- `PUT /jobs:id`
- `PATCH /jobs:id`
- `GET /companies`
- `GET /logs`
- `GET /users`

Routes that need authentication and authorization:

- `DELETE /jobs:id`

Routes for Public need authentication as role Customer:

- `POST /public/login`
- `POST /public/register`
- `GET /public/jobs`
- `GET /public/jobs/:id`
- `GET /public/bookmark`
- `POST /public/bookmark/:id`

&nbsp;

---

## 1. _*POST /login*_

_URL_
```
/login
```

_Method_
```
POST
```

_URL Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```JSON
{
    "email": "<email>",
    "password": "<password>"
}
```

_Response (200 - OK)_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Response (400 - Bad Request)_
```JSON
{
	"messages": [
		"Email/Password is required"
	]
}
```

_Response (401 - Unauthorized)_
```JSON
{
	"messages": [
		"Email doesn't exists/Invalid Password"
	]
}
```

## 2. _*POST /Register*_

_Description_
```
Register Users with given role "Admin".
```

_URL_
```
/register
```

_Method_
```
POST
```

_URL Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```JSON
{
    "username": "<username>",
    "email": "<email>",
    "password": "<password>",
    "phoneNumber": "<phone number>",
	"address": "<address>
}
```

_Response (201 - Created)_
```JSON
{
	"messages": {
		"id": "<assigned by system>",
		"email": "<registered email>"
	}
}
```

_Response (400 - Bad Request)_
```JSON
{
	"messages": ["Username is required"]
}
OR
{
	"messages": ["Email is required"]
}
OR
{
	"messages": ["Email format is not valid"]
}
OR
{
	"messages": ["Password is required"]
}
OR
{
	"messages": ["Password length minimum 5"]
}
OR
{
	"messages": ["Phone Number is required"]
}
OR
{
	"messages": ["Phone Number is Invalid, must between 6 - 50 characters"]
}
OR
{
	"messages": ["Address is required"]
}
OR
{
	"messages": ["Address length minimum 3"]
}
```

_Response (409 - Conflict)_
```JSON
{
	"messages": [
		"Email is already used by other users",
		"Username is already taken by other users"
	]
}
```

## 2. _*GET /jobs*_

_Description_
```
GET all jobs from database.
```

_URL_
```
/jobs
```

_Method_
```
GET
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
[
	{
		"id": 1,
		"title": "<job_title>",
		"description": "<job_description>",
		"CompanyId": "<company_id>",
		"UserId": "<user_id>",
		"jobType": "<job_type>",
		"createdAt": "2022-01-10T15:18:46.460Z",
		"updatedAt": "2022-01-10T15:18:46.460Z",
		"Status": "Active"
	}
]
```

## 3. _*POST /jobs*_

_Description_
```
Create Job based on specified req.body inputs. User Id will be assigned automatically based on the creator's Id.
```

_URL_
```
/jobs
```

_Method_
```
POST
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```JSON
{
    "title": "<job title for input>",
    "description": "<job description for input>",
    "CompanyId": "<company name(selection based from list of companies)>",
    "jobType": "<job type(Full-time/Part-time)>"
}
```

_Response (201 - Created)_
```JSON
{
	"id": "<id given by system>",
	"title": "<inputted job title>",
	"description": "<inputted job description>",
	"CompanyId": "<selected company id>",
	"UserId": "<assigned automatically based on User who is created this>",
	"jobType": "<selected jobType>",
	"updatedAt": "2022-01-11T05:11:24.010Z",
	"createdAt": "2022-01-11T05:11:24.010Z",
	"Status": "Active"
}
```

_Response (400) - Bad Request_
```JSON
{
	"messages": ["Title is required"]
}
OR
{
	"messages": ["Title cannot be empty"]
}
OR
{
	"messages": ["Description is required"]
}
OR
{
	"messages": ["Description cannot be empty"]
}
OR
{
	"messages": ["Company Type is required"]
}
OR
{
	"messages": ["Job Type is required"]
}

```

## 3. _*GET /jobs/:id*_

_Description_
```
GET Job based on specified req.params.id.
```

_URL_
```
/jobs/:id
```

_Method_
```
GET
```

_URL Params_
```
JobId as id
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
{
	"id": 2,
	"title": "Backend Developer2",
	"description": "Backend Developer2",
	"CompanyId": 1,
	"UserId": 1,
	"jobType": "Part Time",
	"status": "Active",
	"createdAt": "2022-02-15T14:01:42.312Z",
	"updatedAt": "2022-02-15T14:48:18.106Z",
	"Company": {
		"id": 1,
		"name": "Trade Bureau of Indonesia",
		"companyLogo": "image-trade-bureau-indonesia",
		"location": "Greater Jakarta",
		"email": "admin@tradebureau.go.id",
		"description": "Trade Bureau Indonesia provides accomodations and facilities for Industries within Indonesia.",
		"createdAt": "2022-02-10T08:43:46.359Z",
		"updatedAt": "2022-02-10T08:43:46.359Z"
	}
}
```

_Response (404) - Not Found_
```JSON
{
	"messages": ["Error Job Not Found"]
}
```

## 4. _*PUT /jobs/:id*_

_Description_
```
Edit job property based on specified req.params.id.
```

_URL_
```
/jobs/:id
```

_Method_
```
PUT
```

_URL Params_
```
JobId as id
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```JSON
{
	"title": "<job_title>",
	"description": "<job_description",
	"CompanyId": "<company_id>",
	"jobType": "<job_type>",
}
```

_Response (200 - OK)_
```JSON
{
	"id": "<id given by system>",
	"title": "<inputted job title>",
	"description": "<inputted job description>",
	"CompanyId": "<selected company id>",
	"UserId": "<assigned automatically based on User who is created this>",
	"jobType": "<selected jobType>",
	"updatedAt": "2022-01-11T05:11:24.010Z",
	"createdAt": "2022-01-11T05:11:24.010Z",
	"Status": "Active"
}
```

_Response (400) - Bad Request_
```JSON
{
	"messages": ["Title is required"]
}
OR
{
	"messages": ["Title cannot be empty"]
}
OR
{
	"messages": ["Description is required"]
}
OR
{
	"messages": ["Description cannot be empty"]
}
OR
{
	"messages": ["Company Type is required"]
}
OR
{
	"messages": ["Job Type is required"]
}

```

_Response (404) - Not Found_
```JSON
{
	"messages": ["Error Job Not Found"]
}
```

## 5. _*DELETE /jobs/:id*_

_Description_
```
Delete job based on specified req.params.id. This delete is soft-delete, the status will change to Archived. Users with role Admin can delete all available jobs while Users with role Staff can only delete their own created jobs.
```

_URL_
```
/jobs/:id
```

_Method_
```
DELETE
```

_URL Params_
```
JobId as id
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
{
	"messages": [
		"Full Stack Developer with ID 1 success to delete"
	]
}
```

_Response (403 - Forbidden)_
```JSON
{
	"messages": [
		"Forbidden"
	]
}
```

_Response (404) - Not Found_
```JSON
{
	"messages": [
		"Cannot Delete - Job with ID 111 is not found"
	]
}
```

## 6. _*PATCH /jobs/:id*_

_Description_
```
Edit job status (Active, Inactive, Archived) based on specified req.params.id. Only accessible by users with role Admin.
```

_URL_
```
/jobs/:id
```

_Method_
```
PATCH
```

_URL Params_
```
JobId as id
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
{
	"status": "Archived"
}
```

_Response (200 - OK)_
```JSON
{
	"id": 1,
	"title": "Fullstack Developer",
	"description": "Fullstack Developer",
	"CompanyId": 2,
	"UserId": 1,
	"jobType": "Full - time",
	"status": "Archived",
	"createdAt": "2022-01-28T09:33:52.320Z",
	"updatedAt": "2022-01-28T14:55:34.534Z"
}
```

_Response (403 - Forbidden)_
```JSON
{
	"messages": [
		"Forbidden"
	]
}
```

_Response (404) - Not Found_
```JSON
{
	"messages": [
		"Error Job Not Found"
	]
}
```

## 7. _*GET /companies*_

_Description_
```
Obtain all available companies.
```

_URL_
```
/companies
```

_Method_
```
GET
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
[
	{
		"id": 1,
		"name": "Trade Bureau of Indonesia",
		"companyLogo": "image-trade-bureau-indonesia",
		"location": "Greater Jakarta",
		"email": "admin@tradebureau.go.id",
		"description": "Trade Bureau Indonesia provides accomodations and facilities for Industries within Indonesia.",
		"createdAt": "2022-02-10T08:43:46.359Z",
		"updatedAt": "2022-02-10T08:43:46.359Z"
	},
	{
		"id": 2,
		"name": "Hikari And Partners",
		"companyLogo": "image-hikari-and-partners",
		"location": "Greater Jakarta",
		"email": "admin@hikaripartners.com",
		"description": "Hikari Partners provides financial services for clients.",
		"createdAt": "2022-02-10T08:43:46.359Z",
		"updatedAt": "2022-02-10T08:43:46.359Z"
	}
]
```

## 7. _*GET /logs*_

_Description_
```
Obtain all logs history. The log captures all changes done to the job entity.
```

_URL_
```
/logs
```

_Method_
```
GET
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
[
	{
		"id": 1,
		"name": "Create",
		"description": "New Job with name Fullstack Developer - SaSS 2 and id 1 created",
		"JobId": 1,
		"UserId": 1,
		"createdAt": "2022-01-28T09:33:52.345Z",
		"updatedAt": "2022-01-28T09:33:52.345Z",
		"User": {
			"username": "user12",
			"email": "user12@mail.com"
		},
		"Job": {
			"title": "Fullstack Developer - SaSS 2",
			"description": "Fullstack Developer - SaSS 2",
			"status": "Archived",
			"Company": {
				"name": "Hikari And Partners"
			}
		}
	},
	{
		"id": 2,
		"name": "Patch",
		"description": "The status of Job with name Fullstack Developer - SaSS 2 and id 1 has been updated from Inactive into Inactive",
		"JobId": 1,
		"UserId": 2,
		"createdAt": "2022-01-28T14:55:25.923Z",
		"updatedAt": "2022-01-28T14:55:25.923Z",
		"User": {
			"username": "vinzein",
			"email": "vinzein@mail.com"
		},
		"Job": {
			"title": "Fullstack Developer - SaSS 2",
			"description": "Fullstack Developer - SaSS 2",
			"status": "Archived",
			"Company": {
				"name": "Hikari And Partners"
			}
		}
	}
]
```

## 8. _*GET /users*_

_Description_
```
Obtain current user profile.
```

_URL_
```
/users
```

_Method_
```
GET
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
{
	"id": 5,
	"username": "vinzein",
	"email": "vinzein@mail.com",
	"role": "Admin"
}
```


## 9. _*POST /public/login*_

_Description_
```
Login end point for users with role Customer. Users with other role could not access this end point.
```

_URL_
```
/public/login
```

_Method_
```
POST
```

_URL Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```JSON
{
    "email": "<email>",
    "password": "<password>"
}
```

_Response (200 - OK)_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Response (400 - Bad Request)_
```JSON
{
	"messages": [
		"Email/Password is required"
	]
}
```

_Response (401 - Unauthorized)_
```JSON
{
	"messages": [
		"Email doesn't exists/Invalid Password"
	]
}
```


## 10. _*POST /public/register*_

_Description_
```
Register Users with given role "Customer".
```

_URL_
```
/public/register
```

_Method_
```
POST
```

_URL Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```JSON
{
    "username": "<username>",
    "email": "<email>",
    "password": "<password>",
    "phoneNumber": "<phone number>",
	"address": "<address>
}
```

_Response (201 - Created)_
```JSON
{
	"messages": {
		"id": "<assigned by system>",
		"email": "<registered email>"
	}
}
```

_Response (400 - Bad Request)_
```JSON
{
	"messages": ["Username is required"]
}
OR
{
	"messages": ["Email is required"]
}
OR
{
	"messages": ["Email format is not valid"]
}
OR
{
	"messages": ["Password is required"]
}
OR
{
	"messages": ["Password length minimum 5"]
}
OR
{
	"messages": ["Phone Number is required"]
}
OR
{
	"messages": ["Phone Number is Invalid, must between 6 - 50 characters"]
}
OR
{
	"messages": ["Address is required"]
}
OR
{
	"messages": ["Address length minimum 3"]
}
```

_Response (409 - Conflict)_
```JSON
{
	"messages": [
		"Email is already used by other users",
		"Username is already taken by other users"
	]
}
```

## 11. _*GET /public/jobs*_

_Description_
```
GET all jobs from database with pagination for customer.
```

_URL_
```
/public/jobs
```

_Method_
```
GET
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
{
	"totalItems": 1,
	"jobs": [
		{
			"id": 2,
			"title": "Backend Developer2",
			"description": "Backend Developer2",
			"CompanyId": 1,
			"UserId": 1,
			"jobType": "Part Time",
			"status": "Active",
			"createdAt": "2022-02-15T14:01:42.312Z",
			"updatedAt": "2022-02-15T14:48:18.106Z",
			"Company": {
				"id": 1,
				"name": "Trade Bureau of Indonesia",
				"companyLogo": "image-trade-bureau-indonesia",
				"location": "Greater Jakarta",
				"email": "admin@tradebureau.go.id",
				"description": "Trade Bureau Indonesia provides accomodations and facilities for Industries within Indonesia.",
				"createdAt": "2022-02-10T08:43:46.359Z",
				"updatedAt": "2022-02-10T08:43:46.359Z"
			}
		}
	],
	"totalPages": 1,
	"currentPage": 0
}
```

## 12. _*GET /public/jobs/:id*_

_Description_
```
GET Job based on specified req.params.id.
```

_URL_
```
/public/jobs/:id
```

_Method_
```
GET
```

_URL Params_
```
JobId as id
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
{
	"id": 2,
	"title": "Backend Developer2",
	"description": "Backend Developer2",
	"CompanyId": 1,
	"UserId": 1,
	"jobType": "Part Time",
	"status": "Active",
	"createdAt": "2022-02-15T14:01:42.312Z",
	"updatedAt": "2022-02-15T14:48:18.106Z",
	"Company": {
		"id": 1,
		"name": "Trade Bureau of Indonesia",
		"companyLogo": "image-trade-bureau-indonesia",
		"location": "Greater Jakarta",
		"email": "admin@tradebureau.go.id",
		"description": "Trade Bureau Indonesia provides accomodations and facilities for Industries within Indonesia.",
		"createdAt": "2022-02-10T08:43:46.359Z",
		"updatedAt": "2022-02-10T08:43:46.359Z"
	}
}
```

_Response (404) - Not Found_
```JSON
{
	"messages": ["Error Job Not Found"]
}
```

## 13. _*GET /public/bookmark*_

_Description_
```
GET all bookmarked or favorite jobs added by the current logged in customer.
```

_URL_
```
/public/bookmark
```

_Method_
```
GET
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
[
	{
		"id": 1,
		"UserId": 1,
		"JobId": 5
	},
	{
		"id": 2,
		"UserId": 1,
		"JobId": 3
	},
]
```

## 14. _*POST /public/bookmark/:id*_

_Description_
```
Add job as bookmark or favorite for current logged in customer.
```

_URL_
```
/public/bookmark/:id
```

_Method_
```
POST
```

_URL Params_
```
JobId as id
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
{
	"id": 1,
	"UserId": 1,
	"JobId": 5
}
```

_Response (404) - Not Found_
```JSON
{
	"messages": ["Error Job Not Found"]
}
```

## Global Error

_Response (401 - Unauthorized)_
```JSON
{
	"messages": ["Not Authorized"]
}
```

_Response (403 - Forbidden)_
```JSON
{
	"messages": ["Forbidden"]
}
```

_Response (500 - Internal Server Error)_
```JSON
{
	"messages": ["Internal Server Error"]
}
```