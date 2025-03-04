# Technologie Radar Dokumentation

## Einführung & Ziele

Dies ist ein Projekt des Moduls Web Programming Lab. Das Ziel dieses Projektes ist es die gelernten
Inhalte auf dem Unterricht direkt anzuwenden und mit Technologien zu arbeiten mit denen man sich
noch nicht so gut auskennt.

### Fachlicher Kontext

Der Technologie-Radar ist ein Werkzeug für das Technologie-Management innerhalb eines Unternehmens.
Es ermöglicht CTOs, Tech-Leads und Mitarbeitern, den Überblick über bestehende und neue
Technologien zu behalten. In diesem Radar werden Technologien in vier verschiedene Kategorien
eingeteilt: Techniques, Tools, Platforms und Languages & Frameworks. Zusätzlich erfolgt eine
Einordnung nach ihrem Reifegrad in die Ringe Assess, Trial, Adopt und Hold.

Da es bereits verschiedene Implementierungen von Technologie-Radaren gibt, beispielsweise den
ThoughtWorks Technology Radar, soll diese Software eine benutzerfreundliche und anpassbare
Alternative als Software-as-a-Service (SaaS) Lösung bereitstellen.

### Anforderungen

Die genauen und detaillierten Anforderungen an dieses Projekt können auf dieser Seite eingesehen
werden. Dies ist der detaillierte Projektauftrag.

[Detaillierter Projektauftrag](https://github.com/web-programming-lab/web-programming-lab-projekt/blob/main/Technologie-Radar.md#anforderungen)

### Qualitätsziele

Die definierten Qualitätsanforderungen aus dem Projektauftrag sind die folgenden.

**Qualitätsanforderungen**

* Der Technologie-Radar-Viewer soll neben der Desktop-Ansicht, auch für die Mobile-Ansicht optimiert
  sein.
* Der Technologie-Radar-Viewer soll innert 1s geladen sein.
* Sämtliche Anmeldungen an die Technologie-Radar-Administration werden aufgezeichnet.

### Stakeholder

| Rolle            | Erwartungen & Zuständigkeiten                                                                                      |
|------------------|--------------------------------------------------------------------------------------------------------------------|
| CTO & Tech-Leads | Diese Rollen möchten Administratorrechte und sollen Technologien verwalten, bearbeiten und veröffentlichen können. |
| Mitarbeiter      | Diese Rolle möchte die veröffentlichen Technologien einsehen können.                                               |
| Entwicklungsteam | Zuständig für die Wartung, Erweiterung und Qualitätssicherung des Systems.                                         |

## Rahmenbedingung

Das System wird als Webanwendung entwickelt und folgt einer Client-Server-Architektur. Folgende
Randbedingungen sind festgelegt:

* JavaScript wird für Frontend- und Backendentwicklung verwendet
* Es werden Technologien verwendet mit welchen man noch nicht so viel zu tun hatte
* Man wendet das Gelernte vom Unterricht an

## Kontextabgrenzung

### Fachlicher Kontext

Das System interagiert mit mehreren externen Akteuren und Systemen:

| Nachbar          | Beschreibung                                                                                        |
|------------------|-----------------------------------------------------------------------------------------------------|
| CTO & Tech-Leads | Verwalten und publizieren Technologien über die Administrationsoberfläche.                          |
| Mitarbeiter      | Können die veröffentlichten Technologien über die Viewer-Oberfläche einsehen.                       |
| JWT              | Stellt sichere Token für die Authentifizierung bereit.                                              |
| MongoDB          | Speichert Benutzer, Rollen, Technologien, Kategorien und Ringe.                                     |
| Docker Container | Ein Docker Container wird verwendet, um das Backend und die Datenbank lokal konsistent auszuführen. |

> [!NOTE]  
> In Zukunft würde noch die Hosting-Plattform dazugehören, da man das Produkt als
> Software-as-a-Service anbieten möchte.

### Technischer Kontext

Dies sind die technischen Komponenten und deren Verbindungen:

| Artefakt           | Beschreibung                                                                                      |
|--------------------|---------------------------------------------------------------------------------------------------|
| Angular-Frontend   | Präsentationsschicht, die über eine REST-API mit dem Backend kommuniziert.                        |
| Express.js Backend | API-Schicht, die Anfragen verarbeitet, Authentifizierung prüft und mit der Datenbank interagiert. |
| MongoDB            | NoSQL-Datenbank für die Speicherung aller Technologie- und Benutzerdaten.                         |
| JWT                | Middleware zur Überprüfung von Token-basierten Anfragen.                                          |
| Docker Container   | Containerisierte Bereitstellung des Backends und der Datenbank.                                   |

> [!NOTE]  
> In Zukunft würde noch die Hosting-Plattform dazugehören, da man das Produkt als
> Software-as-a-Service anbieten möchte.

## Lösungsstrategie

Die Lösungsstrategie gibt eine kurze Zusammenfassung und Erläuterung der grundlegenden
Entscheidungen und Lösungsstrategien, die die Architektur des Systems bestimmen.

### Technologie-Entscheidungen

| Technologie                  | Begründung                                                                                                                                                                                                                                                                                                                     |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Angular                      | Ermöglicht eine modulare, wiederverwendbare Frontend-Architektur mit einer starken Typisierung durch TypeScript. Zudem habe ich bereits etwas mit Angular gearbeitet, aber mit älteren Versionen. Da ich im Backend viel neues lernen muss, dachte ich ist es okey wenn ich im Frontend bereits etwas wenig an Vorwissen habe. |
| Angular Material & Bootstrap | Stellt eine moderne, einheitliche UI mit responsiven Komponenten sicher. Angular Material hat gute Standardkomponenten und Bootstrap die nötigen Klassen, um das Layout responsive zu gestalten.                                                                                                                               |
| Express.js                   | Minimalistisches, performantes Backend-Framework mit Middleware-Support. Hatte ich zuvor noch keinen Kontakt damit und haben wir im Unterricht angeschaut und wollte ich weiter vertiefen.                                                                                                                                     |
| MongoDB                      | Ermöglicht flexible, schemalose Speicherung und schnelle Abfragen.                                                                                                                                                                                                                                                             |
| JWT                          | rmöglicht sichere, stateless Authentifizierung mit rollenbasiertem Zugriff.                                                                                                                                                                                                                                                    |

### Backend-Architektur

Das Backend ist wie folgt strukturiert. Diese Struktur wurde gewählt, damit das Projekt in Zukunft
einfach noch weiter wachsen könnte und die Verantwortlichkeiten klar getrennt sind.

* **Interfaces:** Definieren die Datenstrukturen für eine einheitliche Verarbeitung.
* **Models:** Repräsentieren die MongoDB-Schemata für Technologien, Benutzer, Rollen, Kategorien und
  Ringe.
* **Controllers:** Enthalten die Geschäftslogik und verarbeiten API-Anfragen und interagieren mit
  der DB.
* **Routers:** Definieren die Endpunkte der REST-API und leiten Anfragen an die entsprechenden
  Controller weiter.

### Frontend-Architektur

Das Frontend folgt einer komponentenbasierten Struktur:

* **Interfaces:** Definieren die Datenstrukturen für eine einheitliche Verarbeitung.
* **Services:** Kommunizieren mit dem Backend über HTTP Requests.
* **Components html:** Präsentationslogik für die verschiedenen UI-Elemente.
* **Components ts:** Geschäftslogik eines Components.

### Lösungsansatz für die Qualitätsziele

| Qualitätsziel                                                                                            | Lösungsansatz                                                                            |
|----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| Der Technologie-Radar-Viewer soll neben der Desktop-Ansicht, auch für die Mobile-Ansicht optimiert sein. | Angular Material Components zusammen mit Bootstrap                                       |
| Der Technologie-Radar-Viewer soll innert 1s geladen sein.                                                | Nutzung eines Caching-Mechanismus und optimierte API-Architektur. Einfach gehaltenes UI. |
| Sämtliche Anmeldungen an die Technologie-Radar-Administration werden aufgezeichnet.                      | - Nutzung eines Logging-Services, der Anmeldeversuche erfasst.                           |

## Bausteinsicht

### System context

Das System Context Diagram zeigt den Technologie-Radar als zentrales System und dessen Interaktionen
mit externen Akteuren. Es gibt eine ganzheitliche Sicht darauf, welche Nutzer mit dem
System arbeiten.

![System context](assets/C4%20Diagramms-System%20context.drawio.png)

### Containers

Das Container Diagram stellt die Hauptbestandteile des Systems dar und zeigt, wie diese miteinander
kommunizieren. Es beschreibt die technische Architektur, indem es die Interaktionen zwischen
Frontend, Backend und Datenbank visualisiert.

![Containers](assets/C4%20Diagramms-Container.drawio.png)

### Components

Das Component Diagram gibt einen detaillierten Einblick in die Architektur des Systems. Es
beschreibt die internen Komponenten des Backends und Frontends und zeigt, wie sie zusammenarbeiten.

#### Frontend

![Components](assets/C4%20Diagramms-Components%20Frontend.drawio.svg)

#### Backend

![Components](assets/C4%20Diagramms-Component%20Backend.drawio.svg)

### Code

Dieser Abschnitt beschreibt einige wichtige Aspekte auf Code Level wie z.B. APIs und Datenbank
Schemas.

#### APIs

##### Benutzer

POST /login

| Wert             | Beschreibung                                                                                                                                                                              |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Body             | **email:** Die E-Mail-Adresse des Benutzers (erforderlich). <br> **password:** Das Passwort des Benutzers (erforderlich).                                                                 |
| Antwort (Erfolg) | Ein JWT-Token im JSON-Format.                                                                                                                                                             |
| Antwort (Fehler) | Wenn der Benutzer nicht gefunden wird, wird eine Fehlermeldung mit Statuscode 400 zurückgegeben.   <br>  Bei einem Serverfehler wird eine Fehlermeldung mit Statuscode 500 zurückgegeben. | 

GET /users

| Wert             | Beschreibung                                                                    |
|------------------|---------------------------------------------------------------------------------|
| Antwort (Erfolg) | Eine Liste aller Benutzer im JSON-Format.                                       |
| Antwort (Fehler) | ei einem Serverfehler wird eine Fehlermeldung mit Statuscode 500 zurückgegeben. | 

##### Rollen

GET /roles

| Wert             | Beschreibung                                                                     |
|------------------|----------------------------------------------------------------------------------|
| Antwort (Erfolg) | Ein Array von Rollen im JSON-Format.                                             |
| Antwort (Fehler) | Bei einem Serverfehler wird eine Fehlermeldung mit Statuscode 500 zurückgegeben. |

##### Kategorie

GET /categories

| Wert             | Beschreibung                                                                     |
|------------------|----------------------------------------------------------------------------------|
| Antwort (Erfolg) | Ein Array von Kategorien im JSON-Format.                                         |
| Antwort (Fehler) | Bei einem Serverfehler wird eine Fehlermeldung mit Statuscode 500 zurückgegeben. |

GET /categories/:id

| Wert             | Beschreibung                                                                                                                                                    |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Antwort (Erfolg) | Die angeforderte Kategorie im JSON-Format.                                                                                                                      |
| Antwort (Fehler) | Wenn die Kategorie mit der angegebenen ID nicht gefunden wird, wird eine Fehlermeldung mit Statuscode 404 zurückgegeben: `{ "message": "Category not found" }`. |

##### Rings

GET /rings

| Wert             | Beschreibung                                                                     |
|------------------|----------------------------------------------------------------------------------|
| Antwort (Erfolg) | Ein Array von Ringen im JSON-Format.                                             |
| Antwort (Fehler) | Bei einem Serverfehler wird eine Fehlermeldung mit Statuscode 500 zurückgegeben. |

GET /rings/:id

| Wert             | Beschreibung                                                                                                                                          |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| Antwort (Erfolg) | Der angeforderte Ring im JSON-Format.                                                                                                                 |
| Antwort (Fehler) | Wenn der Ring mit der angegebenen ID nicht gefunden wird, wird eine Fehlermeldung mit Statuscode 404 zurückgegeben: `{ "message": "Ring not found" }` |

##### Technologien

GET /technologies

| Wert             | Beschreibung                                                                                                                                                 |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Antwort (Erfolg) | Ein Array von Technologien im JSON-Format. Durch einen Filter kan definiert werden ob alle oder nur die published Technologien zurückgegeben werden sollten. |
| Antwort (Fehler) | Bei einem Serverfehler wird eine Fehlermeldung mit Statuscode 500 zurückgegeben.                                                                             |

GET /technologies/:id

| Wert             | Beschreibung                                                                                                               |
|------------------|----------------------------------------------------------------------------------------------------------------------------|
| Antwort (Erfolg) | Die angeforderte Technologie im JSON-Format.                                                                               |
| Antwort (Fehler) | Wenn die Technologie mit der angegebenen ID nicht gefunden wird, wird eine Fehlermeldung mit Statuscode 404 zurückgegeben. |

POST /technologies

| Wert             | Beschreibung                                                                                                                                                                                      |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Body             | **name:** Der Name der Technologie (erforderlich). <br> **description:** Eine kurze Beschreibung der Technologie (erforderlich). <br> **category:** Die Kategorie der Technologie (erforderlich). |
| Antwort (Erfolg) | Eine Bestätigungsmeldung, dass die Technologie erfolgreich erstellt wurde, und die vollständige Technologie im JSON-Format.                                                                       |
| Antwort (Fehler) | Wenn nicht alle erforderlichen Felder ausgefüllt sind, wird eine Fehlermeldung mit Statuscode 400 zurückgegeben: `{ "message": "All required fields must be filled in!" }`.                       |


PATCH /technologies/:id

| Wert             | Beschreibung                                                                                                                                                                                      |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Body             | **name:** Der Name der Technologie (erforderlich). <br> **description:** Eine kurze Beschreibung der Technologie (erforderlich). <br> **category:** Die Kategorie der Technologie (erforderlich). |
| Antwort (Erfolg) | Eine Bestätigungsmeldung, dass die Technologie erfolgreich aktualisiert wurde, und die aktualisierte Technologie im JSON-Format.                                                                  |
| Antwort (Fehler) | Wenn die erforderlichen Felder nicht ausgefüllt sind, wird eine Fehlermeldung mit Statuscode 400 zurückgegeben: `{ "message": "Name, category and description must be filled in!" }`              |

DELETE /technologies/:id

| Wert             | Beschreibung                                                                                                               |
|------------------|----------------------------------------------------------------------------------------------------------------------------|
| Antwort (Erfolg) | Eine Bestätigungsmeldung, dass die Technologie erfolgreich gelöscht wurde.                                                 |
| Antwort (Fehler) | Wenn die Technologie mit der angegebenen ID nicht gefunden wird, wird eine Fehlermeldung mit Statuscode 404 zurückgegeben. |


#### Datenbank

In diesem Abschnitt werden die verschiedenen MongoDB-Schemas erläutert, die in der Anwendung
verwendet werden. Jedes Schema stellt eine Sammlung von Dokumenten dar und definiert die Struktur
der Daten. Die Datenbank besteht aus den folgenden Hauptsammlungen: `Category`, `Ring`, `Role`,
`Technology` und `User`.

## Category Schema

Das `Category`-Schema definiert eine Kategorie, die einer Technologie zugeordnet werden kann.

| Feld | Typ    | Beschreibung                          |
|------|--------|---------------------------------------|
| name | String | Der Name der Kategorie (erforderlich) |

## Ring Schema

Das `Ring`-Schema beschreibt einen Ring, der einer Technologie zugeordnet werden kann.

| Feld        | Typ    | Beschreibung                              |
|-------------|--------|-------------------------------------------|
| name        | String | Der Name des Rings (erforderlich)         |
| description | String | Die Beschreibung des Rings (erforderlich) |

## Technology Schema

Das `Technology`-Schema beschreibt eine Technologie, die einer Kategorie und einem Ring zugeordnet
werden kann. Es enthält auch Angaben zur Veröffentlichung und zum Veröffentlichungsdatum.

| Feld             | Typ      | Beschreibung                                                     |
|------------------|----------|------------------------------------------------------------------|
| name             | String   | Der Name der Technologie (erforderlich)                          |
| description      | String   | Die Beschreibung der Technologie (erforderlich)                  |
| category         | ObjectId | Referenz zur `Category`-Sammlung (erforderlich)                  |
| ring             | ObjectId | Referenz zur `Ring`-Sammlung                                     |
| description_ring | String   | Beschreibung weshalb dieser Ring gesetzt wurde                   |
| publicationDate  | Date     | Datum der Veröffentlichung                                       |
| published        | Boolean  | Gibt an, ob die Technologie veröffentlicht ist (Standard: false) |
| createdAt        | Date     | Automatisch generiertes Erstellungsdatum                         |
| updatedAt        | Date     | Automatisch generiertes Änderungsdatum                           |

## Role Schema

Das `Role`-Schema definiert verschiedene Benutzerrollen im System.

| Feld | Typ    | Beschreibung                      |
|------|--------|-----------------------------------|
| name | String | Der Name der Rolle (erforderlich) |

## User Schema

Das `User`-Schema beschreibt die Benutzer im System, einschließlich ihrer E-Mail-Adresse, ihres
Passworts und ihrer Rolle.

| Feld     | Typ      | Beschreibung                                    |
|----------|----------|-------------------------------------------------|
| email    | String   | Die E-Mail-Adresse des Benutzers (erforderlich) |
| password | String   | Das Passwort des Benutzers (erforderlich)       |
| role     | ObjectId | Referenz zur `Role`-Sammlung                    |

## Laufzeitsicht

Damit das System funktioniert braucht es:

* Frontend
* Backend
* Datenbank

Im Moment wird das Backend und die Datenbank bereits in einem Dockercontainer zur Verfügung
gestellt. Dies soll eine einfache Entwicklung lokal ermöglichen. Dafür gibt es ein Dokerfile und ein
docker-compose File. Das Frontend muss noch aus der Entwicklungsumgebung mit ´ng serve´ gestartet
werden. In Zukunft wäre es auch die Idee, dass das Frontend in einem Container zur Verfügung
gestellt werden könnte und so einfach gehostet werden könnte in der Cloud.

docker-compose.yaml

```
services:
mongo:
image: mongo
ports:
- "27017:27017"
volumes:
- mongo-data:/data/db

backend:
build: .
ports:
- "3000:3000"
depends_on:
- mongo

volumes:
mongo-data:
```

### Laufzeitsicht Login

Die Laufzeitsicht "Login" zeigt zuerst wie der Ablauf ist, um ein Token zu lösen und danach wie die
Request mit diesem Token durchgeführt werden und wo die Rollen (Berechtigungen) überprüft werden.

![Sequence save technology](assets/Login%20Sequence.svg)

### Laufzeitsicht Technologie Draft speichern

Die Laufzeitsicht "Technologie Draft speichern" zeigt, welche Aufrufe alles gemacht werden müssen,
um eine Technologie erfolgreich zu speichern und welche Elemente alles involviert sind.
Die Authentifizierung und Autorisierung wird in dieser Laufzeitsicht nicht dargestellt, um das
Diagramm übersichtlich zu behalten.

![Sequence save technology](assets/Save%20Technology%20Sequence.drawio.svg)

## Verteilungssicht

### Aktuell

Derzeit befindet sich das Projekt noch in der Entwicklungsphase. Das Backend und die Datenbank sind
bereits in Docker-Containern gekapselt, während das Frontend noch aus der Entwicklungsumgebung mit
ng serve gestartet werden muss. Eine finale Bereitstellung des Frontends ist noch nicht umgesetzt.

| Komponente | Bereitstellung                         |
|------------|----------------------------------------|
| Backend    | Docker-Container                       |
| Datenbank  | Docker-Container                       |
| Frontend   | Lokale Entwicklungsumgebung (ng serve) |

### Zukünftige Verteilung

Um das Frontend ebenfalls für eine produktive Umgebung vorzubereiten, gibt es folgende
Möglichkeiten:

* Dockerisierung des Frontends: Das Angular-Frontend kann in einen separaten Docker-Container
  gepackt
  werden, um eine einheitliche Bereitstellung zu ermöglichen.
* Hosting auf einer Cloud-Plattform: Alternativ kann das Frontend auf Netlify, Firebase Hosting oder
  AWS S3 bereitgestellt werden, während das Backend weiterhin in Docker betrieben wird.

## Querschnittliche Konzepte

### HTTP-Kommunikation

Die Kommunikation zwischen Frontend und Backend funktioniert über eine REST API mit folgenden
HTTP-Methoden:

| Methode | Beschreibung                                                    |
|---------|-----------------------------------------------------------------|
| GET     | Ruft Daten vom Server ab (Lesen von Technologien).              |
| POST    | Erstellt neue Ressourcen (Neue Technologie anlegen).            |
| PATCH   | Aktualisiert eine Ressource teilweise (Technologie bearbeiten). |
| DELETE  | Entfernt eine Ressource (Technologie löschen).                  |

Wichtige HTTP-Statuscodes:

| Methode                    | Beschreibung                        |
|----------------------------|-------------------------------------|
| 200 OK                     | Erfolgreiche Anfrage.               |
| 201 Created                | Neue Ressource wurde erstellt.      |
| 400 Bad Request            | Fehlerhafte Anfrage.                |
| 401 Unauthorized           | Benutzer ist nicht authentifiziert. |
| 403 Forbidden              | Benutzer hat keine Berechtigung.    |
| 404 Not Found              | Ressource wurde nicht gefunden.     |
| 4500 Internal Server Error | Allgemeiner Serverfehler.           |

Authentifizierung via JWT:

* Das Authorization-Header-Format: Authorization: Bearer <token>.

### CRUD-Operationen

Das System folgt dem CRUD-Prinzip (Create, Read, Update, Delete) für die Verwaltung der
Technologien.

| Operation | HTTP-Methode | Route                 |
|-----------|--------------|-----------------------|
| Create    | POST         | /api/technologies     |
| Read      | GET          | /api/technologies     |
| Update    | PUT/PATCH    | /api/technologies/:id |
| Delete    | DELETE       | /api/technologies/:id |

### Authentifizierung und Autorisierung

Die Anwendung nutzt JWT (JSON Web Tokens) für die Authentifizierung. Benutzer erhalten nach dem
Login ein Token, das ihre Rolle (CTO, Tech-Lead, Mitarbeiter) enthält. Die Zugriffskontrolle erfolgt
über Role-Based Access Control (RBAC). Im Backend wird die Rolle verwendet, zum Überprüfen, ob ein
Benutzer Zugriff auf die Endpoints hat. Im Frontend wird die Rolle verwendet, um verschiedene
Inhalte anzuzeigen.

| Rolle           | Berechtigung                                                          |
|-----------------|-----------------------------------------------------------------------|
| CTO , Tech-Lead | Kann Technologien erstellen, bearbeiten, veröffentlichen und löschen. |
| Mitarbeiter     | Kann nur veröffentlichte Technologien einsehen.                       |
| Ohne Rolle      | Kategorien und Rings auslesen                                         |

### Sicherheit

Das System implementiert mehrere Sicherheitsmaßnahmen:

| Massnahme             | Auswirkung                                                |
|-----------------------|-----------------------------------------------------------|
| JWT-Authentifizierung | Stellt sicher, dass nur berechtigte Nutzer Zugriff haben. |
| Input-Validierung     | Verhindert fehlerhafte oder gefährliche API-Anfragen.     |

In Zukunft könne man auch noch:

* CORS-Schutz: Erlaubt nur autorisierte Domains den Zugriff auf die API.
* HTTPS-Empfehlung: In der Produktionsumgebung sollte HTTPS verwendet werden.

### Datenmodell & Interface-Definition

Um eine konsistente und typsichere Handhabung der Daten in der gesamten Anwendung zu gewährleisten,
werden Interfaces sowohl im Frontend als auch im Backend verwendet.

Vorteile

* Einheitlichkeit: Die gleichen Datenstrukturen werden im Backend und Frontend genutzt.
* Typsicherheit: Fehler durch falsche Datenstrukturen werden frühzeitig erkannt.

Beispiel im Frontend:

```
export interface Ring {
_id?: string;
name: string;
description: string;
}
```

Beispiel im Backend:

```
export interface IRing { 
    _id?: string;
    name: string;
    description: string;
}
```

In der Zukunft:
Um sicherzustellen, dass sich die Datenstrukturen nicht unerwartet unterscheiden, können folgende
Maßnahmen für die Zukunft getroffen werden:

* Geteilte Bibliothek mit den Interfaces, welche von Frontend und Backend verwendet wird
* Falls das Backend eine leicht andere Struktur benötigt können noch Data Transfer Objects (DTOs)
  eingeführt werden.

## Architekturentscheidungen

In diesem Abschnitt werden wichtige und kritische Architekturentscheidungen dokumentiert. Diese
Entscheidungen haben wesentliche Auswirkungen auf die Entwicklung, Wartung und Skalierbarkeit des
Systems.

### Entscheidung: Verwendung von Angular für das Frontend

#### Kontext:

Das Frontend sollte auf JavaScript basieren. Die Technologie sollte eine sein, die einem noch nicht
so bekannt ist und wo man das gelernte aus dem Unterricht anwenden kann.

#### Entscheidung:

Das Frontend wird mit Angular entwickelt.

#### Begründung:

* Basiert auf JS und ich habe damit bis jetzt nur ein wenig Erfahrungen gemacht.
* Komponentenbasierte Architektur erleichtert Wiederverwendbarkeit und Modularität.
* Integrierte TypeScript-Unterstützung für bessere Fehlervermeidung.
* Angular Material bietet bereits gut designte UI-Komponenten.
* Lange Unterstützung durch Google garantiert Stabilität und Weiterentwicklung.

#### Konsequenzen:

* Höhere Lernkurve als bei anderen Frameworks wie React oder Vue.js.
* Relativ umfänglich für nur so ein kleines Projekt.

### Entscheidung: Verwendung von Express.js für das Backend

#### Kontext:

Das Backend benötigt ein leichtgewichtiges Framework, das einfache REST-APIs mit einer klaren
Trennung zwischen Middleware, Routing und Geschäftslogik ermöglicht.

#### Entscheidung:

Das Backend wird mit Express.js auf Basis von Node.js entwickelt.

#### Begründung:

* Minimalistisch und flexibel, ideal für REST APIs.
* Große Community und viele Middleware-Lösungen (z. B. für Authentifizierung, Logging).
* Gute Performance für eine API-gestützte Anwendung.

#### Konsequenzen:

* Kein eingebauter ORM, daher Nutzung von Mongoose für MongoDB erforderlich.

### Entscheidung: Nutzung von MongoDB als Datenbank

#### Kontext:

Das System benötigt eine Datenbank. Da mit HTTP Request mit JSON Bodies gearbeitet wird, würde sich
eine NoSQL Datenbank anbieten, welche auch mit JSON Objekten arbeitet und diese verstehen kann.

#### Entscheidung:

Als Datenbank wird MongoDB verwendet.

#### Begründung:

* Versteht und arbeitet mit JSON Struktur.
* Flexibles Schema (einfache Erweiterbarkeit)
* Gute Skalierbarkeit für zukünftige Erweiterungen.
* Gute Integration mit Express.js über Mongoose.

#### Konsequenzen:

* Musste micht mit dem Dokumentenmodell vertraut machen. Da ich bis jetzt mehr mit relationalen
  Tabellen gearbeitet haben.

### Entscheidung: JWT für Authentifizierung und Autorisierung

#### Kontext:

Das System benötigt eine Authentifizierung, die Benutzerrollen
unterscheidet (z. B. CTO, Tech-Lead, Mitarbeiter).

#### Entscheidung:

JSON Web Tokens (JWT) werden für Authentifizierung und Autorisierung genutzt.

#### Begründung:

* Stateless-Architektur: Keine Session-Storage auf dem Server nötig.
* Einfach in REST-APIs integrierbar.
* Leichtgewichtig & weit verbreitet.
* Ermöglicht Role-Based Access Control (RBAC).

#### Konsequenzen:

* Client muss das JWT speichern und bei jeder Anfrage mitsenden.

## Qualitätsanforderungen

In diesem Abschnitt wird nun erklärt welche Massnahmen definiert und umgesetzt wurden, um die
Qualitätsziele zu erreichen.

| Qualitätsziel                        | Massnahmen                                                                                                                                  |
|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Optimierung für Mobile & Desktop     | - Nutzung von Angular Material für responsives Design.  <br> - Unterstützung von Bootstrap für adaptive Darstellung.                        |
| Ladezeit unter 1 Sekunde             | - Simples UI <br> - Nur die nötigen Abfragen ans Backend senden (Kategorien und Ringe, die sich nicht ändern im Frontend zwischenspeichern) |
| Protokollierung von Anmeldeversuchen | - Nutzung eines Logging-Services, der Anmeldeversuche erfasst.                                                                              |

## Risiken & technische Schulden

In diesem Kapitel gibt es eine Auflistung der Risiken und technischen Schulden, der aktuellen
Lösung. Jedoch gibt es auch bereits einige Ideen, wie man die für die Zukunft noch angehen könnte.

| Kategorie            | Problem                                                                                       | Auswirkungen                                                                              | **Mögliche Lösung**                                                                                 |
|----------------------|-----------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| Deployment           | Das Frontend ist noch nicht produktionsfertig (muss mit `ng serve` manuell gestartet werden). | Erschwert das Deployment und verhindert eine einheitliche Bereitstellung mit dem Backend. | Dockerisierung des Frontends oder Hosting auf Netlify/Firebase.                                     |
| Performance          | Keine explizite Ladezeit-Optimierung umgesetzt.                                               | Langsamere Ladezeiten, wenn mehr Daten in der Datenbank sind.                             | Einführung von Caching, Lazy Loading für Module, Reduktion der API-Calls (Dataaggregation)          |
| Datenkonsistenz      | Backend-Interfaces & Frontend-Interfaces sind getrennt (keine zentrale Typendefinition).      | Potentielle Inkonsistenzen, wenn sich Datenstrukturen ändern.                             | Einführung einer Shared-Type-Bibliothek oder Generierung von Typen aus einer OpenAPI-Dokumentation. |
| Fehlendes Monitoring | Keine Logging-/Monitoring-Lösung für Backend-Fehler.                                          | Probleme oder Abstürze im Backend bleiben unbemerkt.                                      | Einführen eines Logging-Services                                                                    |
| Testing              | Kein vollständiges Test-Setup für Backend & Frontend.                                         | Erhöhtes Risiko für Bugs, keine automatische Regressionstests.                            | Einführung von Unit-Tests für Frontend und Backend                                                  |
