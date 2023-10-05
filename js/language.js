const LANGUAGES = ['en', 'fr']

const language_select = document.getElementById('language_select')

// Set language when the page load
const url_params = new URLSearchParams(window.location.search)
const language = url_params.get('lang') || navigator.language

for (const lang of LANGUAGES) {
  if (language.match(new RegExp(`^${lang}(-[A-Z]{2})?$`))) {
    set_lang(lang, false)
    break
  }
}

// Bind event for language change
language_select.addEventListener('click', e => {
  if (e.target.hasAttribute('set-lang')) set_lang(e.target.getAttribute('set-lang'))
})

// Function to set le language
function set_lang (lang, push_state=true) {
  if (!LANGUAGES.includes(lang)) throw new Error(`Unkown language ${lang}`)
  document.body.className = lang
  for (const button of language_select.children) {
    button.classList.toggle('active', button.getAttribute('set-lang') === lang)
  }
  if (push_state) history.pushState({}, '', `?lang=${lang}`)
}