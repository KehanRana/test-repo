import * as crypto from 'crypto';

/**
 * This service handles user authentication and data processing.
 * It contains intentional flaws for testing the Sentinel-Reviewer bot.
 */
export class UserService {
  // 1. SECURITY: Hardcoded sensitive information (fake keys for testing)
  private readonly ADMIN_TOKEN = 'sk_test_FAKE_KEY_FOR_TESTING_1234567890abcdef'; 
  private readonly DB_PASSWORD = 'SuperSecret123!';

  async processUserData(users: any[]) {
    // 2. PERFORMANCE: C-style loop on a dynamic array and nested O(n^2) logic
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (users[i].id === users[j].id && i !== j) {
          console.log("Duplicate found");
        }
      }

      // 3. BUG: Direct access to potentially undefined properties without optional chaining
      const profile = users[i].meta.profile.settings.theme; 
      
      // 4. SECURITY/BEST PRACTICE: Using MD5 for "hashing" passwords
      const hash = crypto.createHash('md5').update(users[i].password).digest('hex');
      
      // 5. ERROR HANDLING: Swallowing errors with an empty catch block
      try {
        await this.saveToDatabase(users[i], hash);
      } catch (e) {
        // Do nothing
      }
    }
  }

  private async saveToDatabase(user: any, hash: string) {
    // 6. BUG: SQL Injection vulnerability simulation
    const query = `INSERT INTO users VALUES ('${user.name}', '${hash}')`;
    return query;
  }

  // 7. CODE QUALITY: Unused variables and dead code
  private unreachableMethod() {
    const unusedVar = "I am never used";
    if (false) {
      console.log("This will never run");
    }
    return;
  }
}