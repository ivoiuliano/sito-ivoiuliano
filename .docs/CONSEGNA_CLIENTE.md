# Guida per la gestione autonoma del sito

Questa guida spiega come **aggiungere articoli al blog**. Il sito è pubblicato su **Vercel**: quando fai push delle modifiche sul repository Git, il deploy avviene in automatico. Non serve fare build manuali né caricare file via FTP.

---

## 1. Cosa ti serve

- Un editor di testo (Blocco note, Notepad++, VS Code, ecc.) per modificare i file degli articoli.
- Accesso al repository Git del sito (per fare push delle modifiche; se non ce l'hai, chiedi allo sviluppatore).

---

## 2. Come aggiungere un nuovo articolo al blog (sito multilingua)

Il blog è **localizzato**: gli articoli in italiano stanno in **`content/blog/it/`**, quelli in inglese in **`content/blog/en/`**. Stesso nome file = stesso articolo in due lingue (es. `strumenti-barocchi.md` in `it/` e in `en/` con contenuto tradotto).

### Passo 1: Scegli la lingua e apri la cartella

- Articolo **in italiano** → cartella **`content/blog/it`**
- Articolo **in inglese** → cartella **`content/blog/en`**
- Per avere l'articolo in entrambe le lingue: crea lo stesso file (stesso nome) in entrambe le cartelle, con titolo e testo tradotti.

### Passo 2: Usa il modello per un nuovo articolo

- In ogni cartella c'è un file **`_template.md`** (il trattino basso fa sì che non venga pubblicato).
- **Copia** `_template.md` dalla cartella della lingua che stai usando e **rinomina** la copia, ad esempio:
  - `come-costruisco-un-violino.md`
  - `strumenti-barocchi.md`
- Il nome del file (senza `.md`) è l'**indirizzo** dell'articolo:  
  `tuosito.it/it/blog/come-costruisco-un-violino` (italiano) e `tuosito.it/en/blog/come-costruisco-un-violino` (inglese, se esiste anche in `content/blog/en/`).

### Passo 3: Compila il frontmatter e il testo

Apri il nuovo file con un editor di testo. In cima vedi un blocco tra `---`:

```yaml
---
title: Titolo dell'articolo
description: Breve descrizione per SEO e anteprima (max 160 caratteri).
date: 2025-01-29
image: /images/blog/opzionale.webp
---
```

- **title**: titolo dell'articolo (quello che vedi in pagina e nei risultati di ricerca).
- **description**: breve descrizione per motori di ricerca e anteprima in elenco (consigliato max 160 caratteri).
- **date**: data di pubblicazione in formato `AAAA-MM-GG`.
- **image**: (opzionale) percorso di un'immagine in evidenza, es. `/images/blog/mia-foto.webp`. Le immagini vanno nella cartella **`public/images/blog/`**.

Sotto il secondo `---` scrivi il **contenuto in Markdown**:

- **Grassetto**: `**testo**`
- *Corsivo*: `*testo*`
- Elenco: righe che iniziano con `- `
- Link: `[testo del link](https://url)`
- Titoli: `## Sottotitolo`
- Immagini: `![Descrizione](/images/blog/nome-file.webp)` (salva prima l'immagine in `public/images/blog/`)

### Passo 4: Salva e pubblica

Salva il file `.md` nella cartella della lingua corretta (**`content/blog/it`** o **`content/blog/en`**). Poi fai **push** delle modifiche sul repository Git: Vercel farà il deploy in automatico e l'articolo apparirà sul sito.

---

## 3. Aggiungere una nuova pagina (non blog)

Per nuove pagine "fisse" (es. "Chi siamo", "Servizi") serve modificare il codice (cartella `app`, componenti, file di traduzione in `messages`). Queste modifiche sono più tecniche; se vuoi essere autonomo solo su testi e articoli, conviene limitarsi al blog come descritto sopra. Per nuove pagine strutturali puoi chiedere supporto allo sviluppatore che ti ha consegnato il progetto.

---

## 4. Riepilogo cartelle utili

| Cartella / file        | Uso                                                                 |
|------------------------|---------------------------------------------------------------------|
| `content/blog/it/`     | Articoli del blog **in italiano**. `_template.md` è il modello.   |
| `content/blog/en/`     | Articoli del blog **in inglese**. `_template.md` è il modello.     |
| `public/images/blog/`  | Immagini degli articoli (riferite nel frontmatter o nel Markdown). |
| `messages/it/` e `messages/en/` | Testi di menu, pulsanti, ecc. (modificabili se ti è stato spiegato). |

Se hai dubbi su un passo (es. come fare push, errore in fase di deploy), annota il messaggio di errore o lo schermo e chiedi allo sviluppatore: con questa struttura puoi gestire in autonomia gli articoli; il deploy è su Vercel.


## 5. Link utili
- [Vercel](https://vercel.com/)
- [Github](https://github.com/)