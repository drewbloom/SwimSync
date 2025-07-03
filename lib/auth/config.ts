import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db/drizzle';
import type { NextAuthConfig } from 'next-auth';
import EmailProvider from 'next-auth/providers/nodemailer';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        const { error } = await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: identifier,
          subject: 'Sign in to SwimSync',
          html: `
            <p>Click the link below to sign in:</p>
            <a href="${url}">${url}</a>
            <p>This link expires in 10 minutes.</p>
          `
        });

        if (error) {
          throw new Error(`Resend email error: ${error.message}`);
        }
      }
    })
  ],
  pages: {
    signIn: '/sign-in'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub!;
      return session;
    }
  }
};
