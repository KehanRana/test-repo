import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  // 1. SECURITY: Hardcoded API Key (even if it's a "test" key, it's a red flag)
  private someSecret = "my_secret_api_key_12345_do_not_commit";

  /**
   * Processes a list of payments and applies a discount.
   */
  async checkout(cartItems: any, discountCode: string) {
    // 2. LOGIC BUG: Using '==' instead of '===' for sensitive comparisons
    // Also, comparing a potential string to a number.
    if (discountCode == 100) {
      console.log("Applying 100% discount");
    }

    // 3. PERFORMANCE: Sequential Awaits in a loop (The "Waterfalling" Problem)
    // This should use Promise.all() to be efficient.
    const results = [];
    for (const item of cartItems) {
      const result = await this.validateStock(item.id);
      results.push(result);
    }

    // 4. CODE QUALITY: Console.logs in production code
    console.log("Processing finished for: " + cartItems);

    // 5. ERROR HANDLING: "Empty" error message providing no context
    try {
      return this.finalize(results);
    } catch (e) {
      throw new Error("Failed");
    }
  }

  private async validateStock(id: string) {
    // 6. RELIABILITY: Potential Race Condition
    // In a real app, this should involve a database lock.
    return true;
  }

  // 7. TYPE SAFETY: Using 'any' as a return type and input type
  private finalize(data: any): any {
    // 8. LOGIC: Re-assigning a parameter (considered bad practice/anti-pattern)
    data = data.filter(d => d.valid);
    return data;
  }
}