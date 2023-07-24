<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary" @click="add()">+ 추가</button>
    </div>
    <ul>
      <li v-for="d in state.data" :key="d.id">
        <span @click="edit(d.id)">
          {{ d.content }}
        </span>
        <button class="del" @click="del(d.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      data: [],
    });

    const add = () => {
      const content = prompt("내용을 입력해 주세요.");

      if (!content) {
        return alert("내용을 입력해 주세요.");
      }
      axios.post("/api/memos", { content }).then((res) => {
        state.data = res.data;
      });
    };

    const edit = (id) => {
      const content = prompt(
        "내용을 입력해주세요.",
        state.data[id - 1].content
      );
      axios.put("/api/memos/" + id, { content }).then((res) => {
        state.data = res.data;
      });
    };

    const del = (id) => {
      const result = confirm(
        `${state.data[id - 1].content}를 삭제 하시겠습니까?`
      );

      if (result) {
        axios.delete("/api/memos/del/" + id).then((res) => {
          state.data = res.data;
        });
      }
    };

    axios.get("/api/memos").then((res) => {
      state.data = res.data;
    });
    return { state, add, edit, del };
  },
};
</script>
<style lang="scss" scoped>
.memo {
  .act {
    text-align: right;
    padding: 10px;
  }

  .del {
    border-style: none;
    display: none;
  }

  li:hover {
    .del {
      display: block;
    }
  }

  ul {
    border-top: 1px solid #f7f7f7;
    list-style: none;
    padding: 15px;
    margin: 0;

    li {
      padding: 15px;
      margin: 10px 0;
      border: 1px solid #eee;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
