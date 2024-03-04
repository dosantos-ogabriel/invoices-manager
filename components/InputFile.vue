<script setup>
import { defineEmits } from "vue";
import { readFileURL } from "~/utils";

const emit = defineEmits(["update:modelValue"]);
const modelValue = defineModel({ type: [String, Array] });
const props = defineProps({
  accept: {
    type: String,
    default: ".csv",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const fileName = ref("");

const inputFile = async (e) => {
  const files = e.target.files;

  if (!files || !files.length) return;

  let value;

  try {
    if (props.multiple) {
      fileName.value = Array.from(files).map((f) => f.name);
      value = await Promise.all(Array.from(files).map((file) => readFileURL(file)));
    } else {
      const fileToRead = files[0];

      fileName.value = fileToRead.name;
      value = await readFileURL(fileToRead);
    }

    emit("update:modelValue", value);
  } catch {
    console.log("Erro ao adicionar arquivos");
  }
};

const removeFile = (index) => {
  fileName.value = Array.from(fileName.value).toSpliced(index, 1);
  emit("update:modelValue", Array.from(modelValue.value).toSpliced(index, 1));
};
</script>

<template>
  <div class="input-file bg-gray-300/40 rounded-md flex items-center justify-center flex-col gap-4">
    <input type="file" :accept="accept" :multiple="multiple" @change="inputFile" />

    <u-icon name="material-symbols:drive-folder-upload-outline" style="font-size: 50px" />

    <template v-if="multiple && fileName.length">
      <div
        v-for="(name, i) in fileName"
        :key="i"
        class="text-sm w-100 p-3 flex items-center justify-between w-[100%] bg-gray-600 z-10 rounded-md"
      >
        <div class="overflow-ellipsis whitespace-nowrap overflow-hidden">
          {{ name }}
        </div>
        <u-button variant="ghost" color="gray" icon="material-symbols:cancel" @click="removeFile(i)" />
      </div>
    </template>

    <div v-else-if="!multiple && fileName" class="text-lg">
      {{ fileName }}
    </div>

    <div v-else class="text-lg">Adicionar {{ multiple ? "arquivos" : "arquivo" }}</div>
  </div>
</template>

<style lang="scss">
.input-file {
  width: 100%;
  padding: 32px;
  aspect-ratio: 2;
  position: relative;

  input {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    inset: 0;
    &::file-selector-button {
      display: none;
    }
  }
}
</style>
