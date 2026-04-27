<script setup>
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'

const open = defineModel({
  type: Boolean,
  default: false,
})

const dialogRef = useTemplateRef('dialogRef')

const syncDialogState = (shouldBeOpen) => {
  if (!dialogRef.value) {
    return
  }

  if (shouldBeOpen && !dialogRef.value.open) {
    dialogRef.value.showModal()
    return
  }

  if (!shouldBeOpen && dialogRef.value.open) {
    dialogRef.value.close()
  }
}

const handleDialogClose = () => {
  open.value = false
}

watch(
  open,
  (isOpen) => {
    syncDialogState(isOpen)
  },
  { immediate: true },
)

onMounted(() => {
  if (!dialogRef.value) {
    return
  }

  syncDialogState(open.value)
  dialogRef.value.addEventListener('close', handleDialogClose)
})

onBeforeUnmount(() => {
  if (!dialogRef.value) {
    return
  }

  dialogRef.value.removeEventListener('close', handleDialogClose)
})
</script>

<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box flex flex-col gap-3" style="max-width: 100%">
      <h1 class="text-3xl text-center font-bold">Code direkt auf das Board hochladen</h1>

      <div role="alert" class="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>Warnung: Der Upload-Service wird aktuell nur unter Windows unterstützt</span>
      </div>

      <p class="w-full text-center">
        Um den Upload des generierten Arduino-Codes auf das Mikrocontroller-Board durchzuführen,
        prüfen Sie bitte, welche der folgenden Schritte bereits erledigt wurden. Führen Sie nur die
        noch ausstehenden Schritte durch:
      </p>

      <details>
        <summary class="btn btn-primary w-full">Python installieren</summary>
        <p>
          Laden Sie die neueste Version von Python von der offiziellen Website herunter:
          <a class="link" href="https://www.python.org/" target="_blank">https://www.python.org/</a
          >.
          <br />
          Während der Installation setzen Sie bitte ein Häkchen bei
          <strong>"Add Python to PATH"</strong>, damit Ihr System Python korrekt erkennt.
        </p>
      </details>

      <details>
        <summary class="btn btn-primary w-full">Arduino IDE installieren</summary>
        <p>
          Besuchen Sie die Arduino-Website und laden Sie die aktuelle Version der Arduino IDE
          herunter:
          <a class="link" href="https://www.arduino.cc/en/software" target="_blank"
            >https://www.arduino.cc/en/software</a
          >.
          <br />
          Folgen Sie den Anweisungen auf dem Bildschirm, um die IDE zu installieren.
        </p>
      </details>

      <details>
        <summary class="btn btn-primary w-full">
          Treiberinstallation für Wemos D1 Mini und ESP32
        </summary>
        <strong>1. Wemos D1 Mini</strong>
        <ol>
          <li>
            Treiber herunterladen: Der Wemos D1 Mini nutzt in der Regel den
            <em>CH340</em> USB-zu-Seriell-Chip. Lade den entsprechenden Treiber von einer
            vertrauenswürdigen Quelle herunter, z. B. direkt von der Herstellerseite des Chips:
            <a class="link" href="https://www.wemos.cc/en/latest/ch340_driver.html" target="_blank"
              >CH340 Treiber</a
            >.
          </li>
          <li>
            Treiber installieren: Starte das heruntergeladene Installationsprogramm und folge den
            Anweisungen.
          </li>
          <li>
            Verbindung prüfen: Schließe den Wemos D1 Mini an deinen PC an und öffne den
            Geräte-Manager. Dort sollte das Gerät korrekt unter den COM-Ports angezeigt werden.
          </li>
        </ol>

        <strong>2. ESP32</strong>
        <ol>
          <li>
            Treiber herunterladen: Viele ESP32-Boards verwenden den
            <em>CP2102</em> USB-zu-Seriell-Chip. Lade den CP210x Treiber von der offiziellen Website
            von Silicon Labs herunter:
            <a
              class="link"
              href="https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers"
              target="_blank"
              >CP210x Treiber</a
            >.
          </li>
          <li>
            Treiber installieren: Führe das Installationsprogramm aus und folge den Anweisungen.
          </li>
          <li>
            Verbindung prüfen: Nachdem du das Board angeschlossen hast, überprüfe im Geräte-Manager,
            ob das ESP32-Board unter den COM-Ports erscheint.
          </li>
        </ol>
      </details>

      <details>
        <summary class="btn btn-primary w-full">
          ESP32 und Wemos D1 Mini zur Arduino IDE hinzufügen
        </summary>
        <p>
          <strong>Schritt 1: Voreinstellungen anpassen</strong><br />
          Öffnen Sie die Arduino IDE und gehen Sie zu
          <em>Datei &gt; Einstellungen</em> (<em>File &gt; Preferences</em>).<br />
          Fügen Sie im Feld <em>Zusätzliche Boardverwalter-URLs</em> die folgenden Links ein (durch
          Kommas oder neue Zeilen getrennt):<br />
          <code
            >https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json</code
          ><br />
          <code>http://arduino.esp8266.com/stable/package_esp8266com_index.json</code>
        </p>
        <p>
          <strong>Schritt 2: Board Manager konfigurieren</strong><br />
          Öffnen Sie den Board Manager über
          <em>Werkzeuge &gt; Board &gt; Boardverwalter...</em>.<br />
          Suchen Sie nach <em>ESP32</em> und installieren Sie das entsprechende Paket.<br />
          Suchen Sie anschließend nach <em>ESP8266</em> (für den Wemos D1 Mini) und installieren Sie
          dieses Paket ebenfalls.
        </p>
      </details>

      <details>
        <summary class="btn btn-primary w-full">Upload-Service installieren und starten</summary>
        <ol>
          <li>
            Laden Sie die ZIP-Datei des Upload-Service herunter:
            <a class="link" href="./upload-service.zip" download target="_blank">Download</a>
          </li>
          <li>
            Entpacken Sie die ZIP-Datei und führen Sie die Datei
            <code>windows_start.bat</code> aus.
          </li>
          <li>
            Ein Kommandozeilenfenster öffnet sich und startet den Upload-Service. Lassen Sie dieses
            Fenster geöffnet, damit der Service im Hintergrund weiterläuft.
          </li>
          <li>
            Verbinden Sie Ihren Mikrocontroller mit dem Computer. Öffnen Sie die Arduino IDE und
            überprüfen Sie im Menü
            <em>Werkzeuge &gt; Port</em>, an welchem Port der Mikrocontroller angeschlossen ist.
          </li>
          <li>Geben Sie diesen Port im Eingabefeld des Upload-Service an.</li>
          <li>
            Nach erfolgreicher Einrichtung können Sie Ihr Programm direkt über die Webplattform mit
            der Funktion "Upload" auf den Mikrocontroller übertragen.
          </li>
        </ol>
      </details>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
