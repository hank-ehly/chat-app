/**
 * debug-log.service
 * chat-app
 *
 * Created by henryehly on 5/7/16.
 */

const debug: boolean = true;

export default function debugLog(...x: any[]) {
  if (debug) {
    console.log(`[${new Date()}]`, ...x);
  }
}
