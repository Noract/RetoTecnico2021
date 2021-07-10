const request = require("supertest");
const app = require("../index.js");

/**
 * Testea el GET para todos los personajes
 */
describe("GET https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje", () => {
  it("respuesta con json que contiene una lista de todas los personajes", (done) => {
    request(app)
      .get("https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
/**
 * Testea el endpoint de personaje, dandole un personaje especifico
 */
describe("GET https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje/:idPersonaje", () => {
  it("respuesta con json que contiene una lista de un solo personaje", (done) => {
    request(app)
      .get("https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje/1")
      .set("Accept", "application/json")
      .expect(200, done);
  });
  it("responder con json cuando la persona no existe", (done) => {
    request(app)
      .get("https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje/awsdadw")
      .set("Accept", "application/json")
      .expect(404)
      .expect(null)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testanedo el Endpoint POST para los personajes
 */
describe("POST https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje", () => {
  it("responder con 200 creado", () => {
    const data = {
      idSwappi: 8
    };
    const res = request(app)
      .post("https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
  });

  it("responder con 404 bad request",  () => {

    const data = {
      idSwappi: 5255252
    };
    const res =  request(app)
      .post("https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje")
      .set("Accept", "application/json")
      .send(data)
      .expect(404)
      .expect("No se encontro el valor")
  });
});

/**
 * Testanedo el Endpoint PUT para los personajes
 */
describe("PUT https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje/:idPersonaje", () => {
  it("respuesta con 200 modificado", () => {
    const data = {
      swappi_id: 8
    };
    request(app)
      .put("https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje/:idPersonaje")
      .set("Accept", "application/json")
      .send(data)
      .expect(200);
  });

  it("respuesta con 404 bad request", () => {
    const data = {
      // no swappi_id
    };
    request(app)
      .put("/https://39mivpuwh2.execute-api.us-east-1.amazonaws.com/dev/v1/Personaje/:idPersonaje")
      .set("Accept", "application/json")
      .send(data)
      .expect(404)
      .expect("No se encontro el valor")

  });
});
