/**
 * Common message utils.
 */
export class MessageUtils {
  /**
   * Removes additional info from Firebase errors.
   */
  static firebaseMessage(message: string): string {
    return message.replace(/Firebase:\s/, '').replace(/\s[(].+[)]./gm, '');
  }
}
