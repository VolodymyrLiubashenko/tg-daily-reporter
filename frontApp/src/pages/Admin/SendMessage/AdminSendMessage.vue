<script setup lang="ts">
import { computed, ref } from "vue";
import { useForm } from "vee-validate";
import Icon from "@components/Icon/Icon.vue";
import FormTextArea from "@components/controls/form/FormTextArea/FormTextArea.vue";
import { useEditMessageByAdmin } from "./composables/useEditMessageByAdmin";
import { useSendMessageByAdmin } from "./composables/useSendMessageByAdmin";

type AdminMessageFormValues = {
   adminMessage: string;
};

const successMessage = ref("");
const aiDraft = ref("");

const {
   sendMessageByAdmin,
   resetSendMessageByAdmin,
   isSendingMessageByAdmin,
   isSendMessageByAdminError,
   sendMessageErrorMessage,
} = useSendMessageByAdmin();

const {
   editMessageByAdmin,
   resetEditMessageByAdmin,
   isEditingMessageByAdmin,
   isEditMessageByAdminError,
   editMessageErrorMessage,
} = useEditMessageByAdmin();

const { handleSubmit, resetForm, setFieldValue, errors } = useForm<AdminMessageFormValues>({
   initialValues: {
      adminMessage: "",
   },
   validationSchema: {
      adminMessage: (value: string) => value.trim().length > 0 || "Введіть текст повідомлення",
   },
});

const hasAdminMessageError = computed(() => Boolean(errors.value.adminMessage));
const hasAiDraft = computed(() => Boolean(aiDraft.value));
const isActionInProgress = computed(
   () => isSendingMessageByAdmin.value || isEditingMessageByAdmin.value,
);
const isSendButtonDisabled = computed(
   () => isActionInProgress.value || hasAdminMessageError.value || hasAiDraft.value,
);
const isEditButtonDisabled = computed(() => isActionInProgress.value || hasAiDraft.value);

const handleSendMessage = handleSubmit(async ({ adminMessage }) => {
   successMessage.value = "";
   resetSendMessageByAdmin();

   try {
      await sendMessageByAdmin({ text: adminMessage });
      resetForm();
      aiDraft.value = "";
      resetEditMessageByAdmin();
      successMessage.value = "Повідомлення відправлено";
   } catch {
      successMessage.value = "";
   }
});

const handleEditMessage = handleSubmit(async ({ adminMessage }) => {
   successMessage.value = "";
   aiDraft.value = "";
   resetSendMessageByAdmin();
   resetEditMessageByAdmin();

   try {
      const response = await editMessageByAdmin({ text: adminMessage });
      aiDraft.value = response.data.editedText;
   } catch {
      aiDraft.value = "";
   }
});

function handleApplyAiDraft() {
   setFieldValue("adminMessage", aiDraft.value);
   aiDraft.value = "";
   resetEditMessageByAdmin();
}

function handleCancelAiDraft() {
   aiDraft.value = "";
   resetEditMessageByAdmin();
}
</script>

<template>
   <section class="admin-send-message">
      <h2 class="admin-send-message__title">Відправити повідомлення від бота</h2>

      <form class="admin-send-message__form" @submit.prevent="handleSendMessage">
         <div class="admin-send-message__editor">
            <FormTextArea
               name="adminMessage"
               label="Повідомлення"
               placeholder="Введіть текст для Telegram..."
               :disabled="isActionInProgress"
            />

            <div v-if="aiDraft" class="admin-send-message__draft">
               <div class="admin-send-message__draft-header">
                  <h3 class="admin-send-message__draft-title">AI-чернетка</h3>
                  <button
                     class="admin-send-message__draft-close"
                     type="button"
                     aria-label="Скасувати AI-чернетку"
                     @click="handleCancelAiDraft"
                  >
                     <Icon name="close" :size="18" />
                  </button>
               </div>
               <p class="admin-send-message__draft-text">{{ aiDraft }}</p>
               <button
                  class="admin-send-message__button admin-send-message__button--outline"
                  type="button"
                  @click="handleApplyAiDraft"
               >
                  Застосувати
               </button>
            </div>
         </div>

         <div class="admin-send-message__actions">
            <button
               class="admin-send-message__button admin-send-message__button--outline"
               type="button"
               :disabled="isEditButtonDisabled"
               @click="handleEditMessage"
            >
               {{ isEditingMessageByAdmin ? "Редагуємо..." : "Відредагувати з AI" }}
            </button>

            <button
               class="admin-send-message__button"
               type="submit"
               :disabled="isSendButtonDisabled"
            >
               {{ isSendingMessageByAdmin ? "Відправляємо..." : "Відправити" }}
            </button>
         </div>

         <p
            v-if="successMessage"
            class="admin-send-message__status admin-send-message__status--success"
         >
            {{ successMessage }}
         </p>

         <p
            v-if="isSendMessageByAdminError"
            class="admin-send-message__status admin-send-message__status--error"
         >
            {{ sendMessageErrorMessage }}
         </p>

         <p
            v-if="isEditMessageByAdminError"
            class="admin-send-message__status admin-send-message__status--error"
         >
            {{ editMessageErrorMessage }}
         </p>
      </form>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.admin-send-message {
   margin-top: var(--space-5);
   padding: var(--space-5);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-md);
}

.admin-send-message__title {
   margin: 0 0 var(--space-3);
   color: var(--color-text-primary);
   font-size: var(--font-size-lg);
   font-weight: 700;
}

.admin-send-message__form {
   display: grid;
   gap: var(--space-3);
}

.admin-send-message__editor {
   display: grid;
   gap: var(--space-4);

   @include mq-raw("(min-width: 768px)") {
      grid-template-columns: minmax(0, 1fr) minmax(280px, 0.9fr);
      align-items: start;
   }
}

.admin-send-message__actions {
   display: flex;
   flex-wrap: wrap;
   gap: var(--space-4);
}

.admin-send-message__button {
   justify-self: flex-start;
   min-height: 40px;
   padding: 0 var(--space-4);
   color: var(--color-text-white);
   background: var(--color-primary);
   border: 0;
   border-radius: var(--radius-sm);
   font: inherit;
   font-size: var(--font-size-sm);
   font-weight: 800;
   cursor: pointer;
   transition:
      background-color 0.18s ease,
      box-shadow 0.18s ease,
      transform 0.18s ease;

   &:hover {
      background: var(--color-primary-hover);
   }

   &:disabled {
      cursor: not-allowed;
      opacity: 0.65;
   }

   &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 24%, transparent);
   }

   &:active {
      transform: translateY(1px);
   }
}

.admin-send-message__button--outline {
   color: var(--color-text-primary);
   background: var(--color-surface);
   border: 1px solid var(--color-border);

   &:hover {
      color: var(--color-primary);
      background: var(--color-surface-secondary);
      border-color: var(--color-primary);
   }
}

.admin-send-message__draft {
   display: grid;
   gap: var(--space-3);
   padding: var(--space-4);
   background: var(--color-surface-secondary);
   border: 1px solid var(--color-border);
   border-radius: var(--radius-sm);
}

.admin-send-message__draft-header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--space-3);
}

.admin-send-message__draft-title {
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-sm);
   font-weight: 800;
}

.admin-send-message__draft-close {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 32px;
   height: 32px;
   flex: 0 0 auto;
   color: var(--color-text-secondary);
   background: transparent;
   border: 1px solid transparent;
   border-radius: var(--radius-sm);
   cursor: pointer;
   transition:
      color 0.18s ease,
      background-color 0.18s ease,
      border-color 0.18s ease;

   &:hover {
      color: var(--color-danger);
      background: var(--color-surface);
      border-color: var(--color-border);
   }

   &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 24%, transparent);
   }
}

.admin-send-message__draft-text {
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-sm);
   line-height: 1.5;
   white-space: pre-wrap;
}

.admin-send-message__status {
   margin: 0;
   font-size: var(--font-size-sm);
   font-weight: 700;
   line-height: 1.4;
}

.admin-send-message__status--success {
   color: var(--color-text-success);
}

.admin-send-message__status--error {
   color: var(--color-danger);
}
</style>
