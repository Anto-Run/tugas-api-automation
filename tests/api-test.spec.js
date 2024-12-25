const { test, expect } = require("playwright/test");
const { Ajv } = require("ajv");

const ajv = new Ajv();

// Get Request
test('TC-1 Get User', async ({ request }) => {

  const response = await request.get('https://reqres.in/api/users/2');

  // Extract response body in JSON format
  const responseJson = await response.json();

  // Assertions
  expect(response.status()).toEqual(200);
  expect(response.ok()).toBeTruthy();
  expect(responseJson.data.id).toEqual(2);
  expect(responseJson.data.email).toEqual("janet.weaver@reqres.in");
  expect(responseJson.data.first_name).toEqual("Janet");
  expect(responseJson.data.last_name).toEqual("Weaver");

  //Validate Json Schema
  const validSchemaGetUser = ajv.validate(require("./json-schema/get-user.schema.json"), responseJson);
  if (!validSchemaGetUser) {
    console.error("AJV Validation Errors:", ajv.errorsText());
  }
  expect(validSchemaGetUser).toBe(true);
});

// Post Request
test('TC-2 Create User', async ({ request }) => {

  const bodyRequest = {
    "name": "Runanto",
    "job": "QA"
  };

  const header ={
     Accept: 'application/json'
  };

  const response = await request.post("https://reqres.in/api/users",{
    headers: header,
    data: bodyRequest
  });

    // Extract response body in JSON format
    const responseJson = await response.json();

    //Assertion
    expect(response.status()).toEqual(201);
    expect(responseJson.name).toEqual("Runanto");
    expect(responseJson.job).toEqual("QA");
    expect(typeof responseJson.createdAt).toBe('string');

     //Validate Json Schema
  const validSchemaCreateUser = ajv.validate(require("./json-schema/create-user.schema.json"), responseJson);
  if (!validSchemaCreateUser) {
    console.error("AJV Validation Errors:", ajv.errorsText());
  }
  expect(validSchemaCreateUser).toBe(true);

});

//Put Request
test('TC-3 Update User', async ({ request }) => {

  const bodyRequest = {
    "name": "Runanto",
    "job": "QA"
  };

  const header ={
     Accept: 'application/json'
  };

  const response = await request.put("https://reqres.in/api/users/2",{
    headers: header,
    data: bodyRequest
  });

    // Extract response body in JSON format
    const responseJson = await response.json();

    //Assertion
    expect(response.status()).toEqual(200);
    expect(responseJson.name).toEqual("Runanto");
    expect(responseJson.job).toEqual("QA");
    expect(typeof responseJson.updatedAt).toBe('string');

     //Validate Json Schema
  const validSchemaUpdateUser = ajv.validate(require("./json-schema/update-user.schema.json"), responseJson);
  if (!validSchemaUpdateUser) {
    console.error("AJV Validation Errors:", ajv.errorsText());
  }
  expect(validSchemaUpdateUser).toBe(true);

});

//Delete Request
test('TC-4 Delete User', async ({request})=> {

  const response = await request.delete("https://reqres.in/api/users/2");

  //Assertion
  expect(response.status()).toEqual(204);
  
  //Check Not Response Body
  const responseBody = await response.text();
  expect(responseBody).toBe('');
  
});

