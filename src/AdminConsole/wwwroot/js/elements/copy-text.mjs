import { defineCustomElement } from 'vue'

const CopyTextElement = defineCustomElement({
  props: {
    title: String,
    value: String,
    type: {
      type: String,
      default: "text"
    },
  },
  data() {
    return {
      hidden: true,
      copyCompleted: false,
    }
  },
  computed: {
    currentType() {
      return this.type === 'password' 
      ? (this.hidden ? 'password' : 'text')
      : this.type
    },
    typeIsPassword() { return this.type === 'password' },
  },
  methods: {
    toggleHidden() {
      this.hidden = !this.hidden;
    },
    async copyText() {
      try {
        await navigator.clipboard.writeText(this.value);
        this.copyCompleted = true;
        setTimeout(() => {
          this.copyCompleted = false;
        }, 1000);
      } catch (err) {
        console.error("Cannot copy text.");
      }
    },
  },
  template: /*html*/`
    <div id="copyText" class="w-full">
      <label v-if="title" for="field" class="block text-sm font-medium leading-6 text-gray-900">{{title}}</label>
      <div class="my-2 flex rounded-md shadow-sm">
        <input :type="currentType" readonly :value="value" class="block w-full font-mono rounded-none rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <button type="button" title="Copy" class="btn-secondary rounded-l-none" :class="{ 'rounded-r-none': typeIsPassword }" @click="copyText">
          <svg v-if="!copyCompleted" xmlns="http://www.w3.org/2000/svg" class="-ml-0.5 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
          <svg v-if="copyCompleted" xmlns="http://www.w3.org/2000/svg" class="-ml-0.5 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
          </svg>
        </button>
        <button type="button" v-if="typeIsPassword" title="Toggle visibility" class="btn-secondary rounded-l-none" @click="toggleHidden">
          <svg v-if="hidden" xmlns="http://www.w3.org/2000/svg" class="-ml-0.5 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <svg v-if="!hidden" xmlns="http://www.w3.org/2000/svg" class="-ml-0.5 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    @import url("/css/tailwind.css");

    :host {
      width: 100%;
    }
  `]
})

customElements.define('copy-text', CopyTextElement)
