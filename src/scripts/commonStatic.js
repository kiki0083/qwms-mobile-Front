export default {
/**---------------------------------------
 * 공통
 * ---------------------------------------
 */

/**---------------------------
 *  Notify 정보
 * ---------------------------
 */

/**
 * Notify error
 */
ERROR_NOTIFY : {
                  message : '',
                  color: 'red',
                  position:'bottom-right',
                  actions: [{ label: '닫기', color: 'white', handler: () => { /* ... */ } }]
                },
/**
 * Notify success
 */
SUCCESS_NOTIFY : {
                  message : '',
                  color: 'green-10',
                  position:'bottom-right',
                  actions: [{ label: '닫기', color: 'white', handler: () => { /* ... */ } }]
                },
}
