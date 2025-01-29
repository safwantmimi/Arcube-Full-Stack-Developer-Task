## 🚀 | Usage

- Install Docker and use it for a quick setup.
- Clone this repository:<br>

```sh
git clone https://safwantmimi/Arcube-Full-Stack-Developer-Task.git
```

- Rename .env.dist to .env:


- Open the project folder and start the container with docker compose:<br>

```yml
docker compose up --build

```
- Enjoy the project! 😉

<br/>

## 🌐 | API Endpoints

```yml
GET:
    /:shortened_id : Get the shortened URL from DB
POST:
    /shorten [body : {"OriginalUrl" : "url"}] : Shorten the URL and store in DB


Access the API using the following URLs:
    Client: http://localhost:3000/
    Load Balanced Server: http://localhost:4000/
```

<br/>

## 💻 | References

- [TinyURL System Design](https://www.codekarle.com/system-design/TinyUrl-system-design.html)
- [System Design : Scalable URL shortener service like TinyURL](https://medium.com/@sandeep4.verma/system-design-scalable-url-shortener-service-like-tinyurl-106f30f23a82)
- [An Illustrated Proof of the CAP Theorem](https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/)
- [What is eventual consistency and why should you care about it?](https://www.keboola.com/blog/eventual-consistency)
- [Redis Documentation](https://redis.io/documentation)
- [Apache Zookeeper Documentation](https://zookeeper.apache.org/doc/r3.7.0/index.html)
- [Nginx HTTP Load Balancing Documentation](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
- [Docker Documentation](https://docs.docker.com/language/nodejs/)
- [Kompose Documentation](https://kompose.io/user-guide/)

<br/>

## 🧑🏽 | Author

**Safouan TMIMI**

- Linkedin: [@safwantmimi](https://www.linkedin.com/in/safwantmimi/)
- Github: [@safwantmimi](https://github.com/safwantmimi)

---
