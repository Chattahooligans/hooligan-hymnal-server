// const request = require("supertest");
// const assert = require("assert");
// const req = request("http://localhost:3000/api");

// // Get all players
// describe("GET /api/players", function() {
// 	it("returns all players as an array of json objects", function() {
// 		return req
// 			.get("/players")
// 			.set("Accept", "application/json")
// 			.expect("Content-Type", /json/)
// 			.expect(200)
// 			.then(response => {
// 				assert(response.body.length >= 25);
// 				for (let i = 0; i < response.body.length; i++) {
// 					assert(response.body[i]._id);
// 					assert(response.body[i].name);
// 					assert(Date.parse(response.body[i].createdAt));
// 					assert(Date.parse(response.body[i].updatedAt));
// 					assert(Date.parse(response.body[i].update_time));
// 				}
// 			});
// 	});
// });

// // Get one players
// describe("GET /api/players/:id", function() {
// 	it("returns one player as a json object", function() {
// 		return req
// 			.get("/players/5cd9f36b2d8145242e75d5ce")
// 			.set("Accept", "application/json")
// 			.expect("Content-Type", /json/)
// 			.expect(200)
// 			.then(response => {
// 				assert.strictEqual(response.body._id, "5cd9f36b2d8145242e75d5ce");
// 				assert.strictEqual(response.body.name, "Dru Huber");
// 				assert.strictEqual(response.body.squadNumber, "1");
// 				assert.strictEqual(response.body.position, "Goalkeeper");
// 				assert.strictEqual(response.body.team, "Townsville City United Rovers FC");
// 				assert.deepStrictEqual(
// 					response.body.bio,
// 					{
// 						en: "Headshot courtesy of Townsville City United Rovers FC"
// 					}
// 				);
// 				assert.strictEqual(response.body.twitter, "dru_huber_5cd9f36b2d8145242e75d5ce");
// 				assert.strictEqual(response.body.instagram, "dru_huber_5cd9f36b2d8145242e75d5ce");
// 				assert(Date.parse(response.body.createdAt));
// 				assert(Date.parse(response.body.updatedAt));
// 				assert(Date.parse(response.body.update_time));
// 			});
// 	});
// });
