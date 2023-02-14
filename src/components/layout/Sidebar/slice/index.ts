import { createSlice } from '@reduxjs/toolkit';

interface SidebarSliceState {
  isOpen: boolean;
  isMobileSidebarOpen: boolean;
}

const initialState: SidebarSliceState = {
  isOpen: true,
  isMobileSidebarOpen: false
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openSidebar(state) {
      state.isOpen = true;
    },
    closeSidebar(state) {
      state.isOpen = false;
    },
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
    openMobileSidebar(state) {
      state.isMobileSidebarOpen = true;
    },
    closeMobileSidebar(state) {
      state.isMobileSidebarOpen = false;
    },
    toggleMobileSidebar(state) {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen;
    }
  }
});

export const {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  openMobileSidebar,
  closeMobileSidebar,
  toggleMobileSidebar
} = sidebarSlice.actions;
