<template>
  <div>
    <div>
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex justify-center items-center w-full px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-opacity-75"
          >
            Options
            <ChevronDownIcon
              class="w-5 h-5 ml-2 -mr-1 text-blue-100 hover:text-blue-50"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class=" scale-95 opacity-0"
          enter-to-class=" scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class=" scale-100 opacity-100"
          leave-to-class=" scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 space-y-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-blue-500 text-white' : 'text-gray-900',
                    'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                  ]"
                  class=""
                  @click="toggleAddUser()"
                >
                  Ajouter des participants
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-blue-500 text-white' : 'text-gray-900',
                    'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                  ]"
                  class=""
                  @click="toggleAddTasks()"
                >
                  Tâches hebdomadaire
                </button>
              </MenuItem>
              <!-- <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-blue-500 text-white' : 'text-gray-900',
                    'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                  ]"
                  class=""
                  @click="toggleAddSpecial()"
                >
                  Tâches occasionnelles
                </button>
              </MenuItem> -->
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-blue-500 text-white' : 'text-gray-900',
                    'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                  ]"
                  class=""
                  @click="toggleChangeColor()"
                >
                  Changer la couleur
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-red-500 text-white' : 'text-gray-900',
                    'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                  ]"
                  class=""
                  @click="toggleLeaveGrp()"
                >
                  Quitter le groupe
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-red-500 text-white' : 'text-gray-900',
                    'group flex justify-center rounded-md items-center w-full text-lg py-2 px-4',
                  ]"
                  class=""
                  @click="logout()"
                >
                  Deconnexion
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <Transition name="modal">
      <AddUserInGrp
        @close="toggleAddUser"
        v-if="isAddUser"
        :name="$store.state.name"
        :users="$store.state.users"
      />
    </Transition>
    <Transition name="modal">
      <AddTasksHebdo @close="toggleAddTasks" v-if="isAddTasks" />
    </Transition>
    <!-- <Transition name="modal">
      <AddTasksSpecial @close="toggleAddSpecial" v-if="isAddSpecial" />
    </Transition> -->
    <Transition name="modal">
      <LeaveGrp
        @close="toggleLeaveGrp"
        v-if="isLeaveGrp"
        :color="$parent.$parent.color"
        :users="$parent.$parent.users"
      />
    </Transition>
    <Transition name="modal">
      <ChangeColor @close="toggleChangeColor" v-if="isChangeColor" />
    </Transition>
  </div>
</template>

<script>
import AddUserInGrp from "../modal/AddUserInGrp.vue";
import AddTasksHebdo from "../modal/AddTasksHebdo.vue";
import LeaveGrp from "../modal/LeaveGrp.vue";
import ChangeColor from "../modal/ChangeColor.vue";
// import AddTasksSpecial from "../modal/AddTasksSpecial.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

export default {
  name: "ActionMenuGroup",
  components: {
    AddUserInGrp,
    AddTasksHebdo,
    // AddTasksSpecial,
    LeaveGrp,
    ChangeColor,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon,
  },
  data() {
    return {
      isAddUser: false,
      isAddTasks: false,
      // isAddSpecial: false,
      isLeaveGrp: false,
      isChangeColor: false,
    };
  },
  methods: {
    toggleAddUser() {
      this.isAddUser = !this.isAddUser;
    },
    toggleAddTasks() {
      this.isAddTasks = !this.isAddTasks;
    },
    // toggleAddSpecial() {
    //   this.isAddSpecial = !this.isAddSpecial;
    // },
    toggleLeaveGrp() {
      this.isLeaveGrp = !this.isLeaveGrp;
    },
    toggleChangeColor() {
      this.isChangeColor = !this.isChangeColor;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>