# Fazit und Reflexion

## Was ist gut gelaufen?

Die Technologieauswahl hat sehr gut funktioniert. Die Technologien haben gut zusammengespielt, was
ich aber auch etwas erwartet habe, da wir viele der Technologien im Unterricht bereits angeschaut
haben. Mit JWT hatte ich noch nicht so viel Erfahrung, war deshalb etwas erstaunt wie einfach dies
umzusetzen war. Da ich mit Angular bereits einige Erfahrungen gemacht habe von anderen kleinen
Projekten, war der Frontend-Teil definitiv einfacher umzusetzen als der Backend-Teil. Die
Responsiveness war auch relativ simpel umzusetzen, da Angular Material und Bootstrap diese Aufgabe
gut übernehmen.

## Wo lagen die Herausforderungen?

In einem ersten Schritt ist es mir etwas schwierig gefallen mit dem Programmieren anzufangen. Da ich
mit den Backend und Datenbank Technologien noch nicht so viel zu tun hatte, musste ich mich da etwas
mehr einlesen. Am liebsten hätte ich mit dem Frontend begonnen, aber hätte den ganzen Data-Teil
mocken müssen, was ich nicht als sehr sinnvoll empfand. Deshalb habe ich dann mit dem Backend und
der Datenbank begonnen und mich am Unterrichtsmaterial orientiert. Da wir dort aber an kleineren
Beispielen gearbeitet haben, war es für mich schwierig wie man das Backend sinnvoll für ein
richtiges Projekt strukturieren sollte. Ich habe dann im Internet nach Vorschlägen gesucht und viele
Blogs gefunden, die ähnliche Projekte erklärt haben. Daran habe ich mich dann orientiert.
Ein weiterer Stolperstein war auch die Dockerisierung. Für mich war von Anfang an klar, dass ich das
Backend und die Datenbank in einem Dockercontainer laufen lassen möchte, damit wenn es mal läuft,
ich mich voll auf das Frontend konzentrieren kann. Jedoch finde ich es immer schwierig so
Dockerfiles
und docker-compose Files zu schreiben, denn man hat oft nicht viel Feedback wo der Fehler liegt und
weshalb es nicht funktioniert. Deshalb ist dort einiges an Zeit draufgegangen.
Das Testing ist etwas das jetzt nicht spezifisch eine Herausforderung war, sondern aus Zeitgründen
nicht mehr komplet umgesetzt werden konnte. Ich finde es aber sehr sinnvoll, wenn man dieses für die
Zukunft noch erweitern würde.

## Was würde ich das nächste Mal anders resp. besser machen?

Ich würde mir für das nächste Mal einen klareren Plan machen wie ich vorgehen möchte, um das Projekt
zu programmieren. Am Anfang war ich wirklich etwas verloren, wo ich starten sollte. Ich habe mir in
den ersten Schritten auch etwas viel aufs Mal vorgenommen und an 5 Sachen parallel gearbeitet. Somit
war es dann schwierig die grundlegenden Probleme zu identifizieren. Das habe ich dann jedoch gemerkt
und bin dann nur noch Schritt für Schritt vorgegangen. Es hilft mir auf jeden Fall, wenn ich ein
Beispielprojekt habe und etwas die Grundstruktur anschauen kann. Ich habe mich jetzt bei diesem
Projekt nicht direkt auf die Ladezeit-Optimierung fokussiert, da es sehr klein und übersichtlich
ist. Wenn dass Projekt aber grösser würde, müsste man da sicher noch einige Mechanismen wie Lazy
Loading, Caching oder Dataaggreation einführen. Ich würde für ein anderes Mal auch das Testing
direkt mit der Entwicklung machen und nicht erst gegen den Schluss, damit Probleme frühzeitig
erkennt werden und gelöst werden können. Wenn ich einen Fokus für die Tests setzten müsste, würde
ich mich für das Backend entscheiden. Auch ein besseres Logging oder Monitoring würde die
Fehlersuche unterstützen und sicherstellen, dass Probleme einfacher gefunden werden können.
Das Deployment vom Frontend könnte man natürlich auch noch umsetzten. Fand ich aber jetzt für meine
Entwicklungsarbeit nicht so störend, dass ich dies immer aus der IDEA starten musste. Die Interface
Thematik im Frontend und Backend hat sicher auch noch Potenzial. Zum einen könnte man sie
zusammennehmen oder noch DTOs eingeführt werden.