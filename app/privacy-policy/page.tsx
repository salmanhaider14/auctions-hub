import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 dark:text-gray-300">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        This Privacy Policy describes how Auctions Hub collects, uses, and
        discloses your information when you use our mobile application (the
        &quot;App&quot;).
      </p>
      <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
      <ul className="list-disc pl-4 mb-4">
        <li className="text-gray-700">
          Personal Information: When you create an account or use certain
          features of the App, you may provide us with certain personal
          information, such as your name, email address, and username.
        </li>
        <li className="text-gray-700">
          Usage Data: We may collect information about your activity on the App,
          such as the auctions you view and bid on, and the time and date of
          your activity.
        </li>
      </ul>
      <h2 className="text-xl font-bold mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-4 mb-4">
        <li className="text-gray-700">
          To provide and maintain the App: We use your information to operate
          and maintain the App, and to provide you with the features and
          services you request.
        </li>
        <li className="text-gray-700">
          To send you communications: We may use your information to send you
          important information about the App, such as service announcements and
          changes to our policies. We may also use your information to send you
          promotional communications, but you can opt out of receiving these
          communications by following the unsubscribe instructions in the
          communications.
        </li>
        <li className="text-gray-700">
          To personalize your experience: We may use your information to
          personalize your experience with the App, such as by recommending
          auctions that you may be interested in.
        </li>
      </ul>
      <h2 className="text-xl font-bold mb-2">Disclosure of Your Information</h2>
      <p className="text-gray-700 mb-4">
        We may disclose your information to third-party vendors and service
        providers who work on our behalf to provide us with the services we need
        to operate and maintain the App. We may also disclose your information
        if we are required to do so by law.
      </p>
      <h2 className="text-xl font-bold mb-2">Your Choices</h2>
      <ul className="list-disc pl-4 mb-4">
        <li className="text-gray-700">
          You can access and update your personal information in your account
          settings.
        </li>
        <li className="text-gray-700">
          You can opt out of receiving promotional communications from us by
          following the unsubscribe instructions in the communications.
        </li>
      </ul>
      <h2 className="text-xl font-bold mb-2">Data Security</h2>
      <p className="text-gray-700 mb-4">
        We use commercially reasonable measures to protect your information from
        unauthorized access, disclosure, alteration, or destruction. However, no
        internet or electronic storage system is 100% secure, so we cannot
        guarantee the security of your information.
      </p>
      <h2 className="text-xl font-bold mb-2">Changes to This Privacy Policy</h2>
      <p className="text-gray-700">
        We may update this Privacy Policy from time to time by posting the
        revised version on the App. We encourage you to review the Privacy
        Policy regularly to stay informed about updates.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
