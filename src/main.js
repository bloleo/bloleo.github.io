import './style.css'

const TYPE_SPEED_BODY = 50;
const DISTANCE_VALUE = 9515.7;
const DISTANCE_DURATION = 2000;


const mailbox = document.getElementById("mailbox");
const sceneMail = document.getElementById("scene-mail");
const sceneLetter = document.getElementById("scene-letter");

mailbox.addEventListener("click", () => {
  sceneMail.classList.add("scene--fade-out");

  setTimeout(() => {
    sceneMail.classList.remove("scene--active");
    sceneLetter.classList.add("scene--active", "scene--fade-in");

     playLetterScene();
  }, 1200);

  
});


function typeWriterSpan(span, text, speed = 50) {
  let index = 0;

  return new Promise((resolve) => {
    function type() {
      if (index < text.length) {
        span.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}





function animateDistance(target = 9515.7, duration = 900) {
  const el = document.getElementById("distance");
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = (progress * target).toFixed(1);
    el.textContent = value.replace(".", ",");

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

async function playLetterScene() {
  // Clear everything first (prevents early display)
  document.getElementById("p1-before").textContent = "";
  document.getElementById("distance").textContent = "";
  document.getElementById("p1-after").textContent = "";
  document.getElementById("p2").textContent = "";
  document.getElementById("p3").textContent = "";
  document.getElementById("p4").textContent = "";

  // Text content (single source of truth)
  const p1Before =
    "Y si bien actualmente nos separan unos poquitos ";
  const p1After =
    " km de distancia, no quise dejar que eso me detuviera en mi propósito de expresar mi amor por vos.";
  const p2Text =
    "No solo sos bombón, sino también, ¡cumpleañero!";
  const p3Text =
    "Es por eso que se me ocurrió armar esta paginita para vos, con la idea de que te haga sentir como si estuviera ahí al lado tuyo, abrazándote muuuuuuuuuuuuuuuuuuy pero muy fuerte y llenándote la cara de besitos.";
  const p4Text =
    "Espero que te guste! <3"

  await pause(2300);

  // 3️⃣ Remaining paragraphs
  await typeWriterSpan(
    document.getElementById("p2"),
    p2Text,
    TYPE_SPEED_BODY
  );

  await pause(400);

  // 2️⃣ Paragraph with number (INLINE, no overwrite)
  await typeWriterSpan(
    document.getElementById("p1-before"),
    p1Before,
    TYPE_SPEED_BODY
  );

  animateDistance(DISTANCE_VALUE, DISTANCE_DURATION);
  await pause(DISTANCE_DURATION + 150);

  await typeWriterSpan(
    document.getElementById("p1-after"),
    p1After,
    TYPE_SPEED_BODY
  );

  await pause(400);

  await typeWriterSpan(
    document.getElementById("p3"),
    p3Text,
    TYPE_SPEED_BODY
  );
  
  await typeWriterSpan(
    document.getElementById("p4"),
    p4Text,
    TYPE_SPEED_BODY
  );
}

function pause(ms) {
  return new Promise((r) => setTimeout(r, ms));
}




