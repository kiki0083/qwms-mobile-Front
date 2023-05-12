import { defineStore } from "pinia";

export const useSession = defineStore("session", {
  state: () => ({
    session: {},
  }),
  getters: {
    divcd: function (state) {
      return state.session.divcd;
    },
    dst: function (state) {
      return state.session.dst;
    },

    icgrkey: function (state) {
      return state.session.icgrkey;
    },
    duplLog: function (state) {
      return state.session.duplLog;
    },
    /* 센터코드 */
    ctKey: function (state) {
      return state.session.ctKey;
    },
    usrtyp: function (state) {
      return state.session.usrtyp;
    },
    rstclgst: function (state) {
      return state.session.rstclgst;
    },
    usKey: function (state) {
      return state.session.usKey;
    },
    urGrKey: function (state) {
      return state.session.urGrKey;
    },
    ctKey_desc: function (state) {
      return state.session.ctKey_desc;
    },
    urName: function (state) {
      return state.session.urName;
    },
    utcMinute: function (state) {
      return state.session.utcMinute;
    },
    utcOffset: function (state) {
      return state.session.utcOffset;
    },
    /* 사용자 아이디 */
    urKey: function (state) {
      return state.session.urKey;
    },
    /* 사용자 아이피 주소 */
    ipAddress: function (state) {
      return state.session.ipAddress;
    },
    utcHour: function (state) {
      return state.session.utcHour;
    },
    chgPw: function (state) {
      return state.session.chgPw;
    },
    /* 로그인 여부 */
    loginStatus: function (state) {
      return state.session.loginStatus;
    },
    urliloh_key: function (state) {
      return state.session.urliloh_key;
    },
    rep_ackey: function (state) {
      return state.session.rep_ackey;
    },
    loggrpcd: function (state) {
      return state.session.loggrpcd;
    },
    laKey: function (state) {
      return state.session.laKey;
    },
    rstcdiv: function (state) {
      return state.session.rstcdiv;
    },
    gmtUseYn: function (state) {
      return state.session.gmtUseYn;
    },
    expireDateStatus: function (state) {
      return state.session.expireDateStatus;
    },
    /* 화주코드 */
    owkeym: function (state) {
      return state.session.owkeym;
    },
  },
  actions: {
    setSession(session) {
      this.session = session;
    },
    dispenseSession() {
      sessionStorage.removeItem("session");
    },
    getSession() {
      return state.session;
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: sessionStorage }],
  },
});
