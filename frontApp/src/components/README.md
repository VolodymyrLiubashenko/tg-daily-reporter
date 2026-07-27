# components

Перевикористовувані Vue-компоненти. Імпорт: `import X from "@components/X.vue"` або `@/components/X.vue`.

| Папка     | Опис                                                                   |
| --------- | ---------------------------------------------------------------------- |
| `Icon/`   | Обгортка над Lucide (`icons.ts` + `Icon.vue`)                          |
| `Button/`      | Кнопка `primary` / `outline`, слот тексту, опційна іконка через `Icon` |
| `FeatureCard/` | Картка з іконкою, заголовком, описом і посиланням-CTA                  |

## Controls

Shared form controls live in `controls/`:

- `Input/Input.vue` is the base text input style.
- `TextArea/TextArea.vue` mirrors the Input visual language for multiline text.
- `controls/form/FormInput/` and `controls/form/FormTextArea/` connect base controls to `vee-validate`.

When adding form UI, prefer these shared controls instead of duplicating local input/textarea markup. Use theme tokens from `@styles/variables.scss`; do not hardcode component-local colors for borders, backgrounds, or text.
