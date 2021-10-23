{
  "slug": "version-numbering-explained",
  "title": "Verbose Guacamole Version Numbers Explained",
  "summary": "Most software uses Semantic Versioning, or SemVer, to create versions for its projects that reflect how many versions there have been in the past. Some example SemVer numbers are v0.3.5, v1.2.0, and v2.0.1. Verbose Guacamole, on the other hand, uses Calendar Versioning—CalVer for short—to name its versions. The first version, for example, was v21.10 (technically v21.10.0). What does this mean?",
  "author": "Benjamin Hollon",
  "date": "October 23, 2021"
}

---

Most software uses Semantic Versioning, or SemVer, to create versions for its projects that reflect how many versions there have been in the past. Some example SemVer numbers are v0.3.5, v1.2.0, and v2.0.1. Verbose Guacamole, on the other hand, uses Calendar Versioning—CalVer for short—to name its versions. The first version, for example, was v21.10 (technically v21.10.0). What does this mean?

## What is CalVer
Take another look at that version number. If you look closely, you'll realize that it's really a date: October 2021, the month the first Verbose Guacamole version came out.

Calendar Versioning means that each version is really the date it came out. While this takes different forms (unlike the rigorously defined SemVer), CalVer is extremely intuitive once explained.

## Why CalVer
If most software uses SemVer, why did I decide to use Calendar Versioning?

In my mind, the most important reason is that it's a commitment. On the one hand, I am committing to avoid swamping you with multiple feature updates in a month. On the other, I'm committing to provide regular updates (though they might not be every month) because if I drop the project, that will be very evident in the version.

I mentioned that I'll only give one "feature update" per month; what did I mean by that?

Feature updates are ones that add new functionality or change the user experience. The alternative would be bug fixes which bring the reality of the program up to spec with the expectation users have.

In other words, though there may be mid-month updates to fix bugs, updating the documentation should not be necessary because there will be no new features.

## Update Schedule
One unique idea that Calendar Versioning lets me play out is that of providing updates on a schedule based on writing events during the year. In this case, I've decided to base the update schedule around NaNoWriMo, or National Novel Writing Month, which I participate in each November.

In it, writers are challenged to write 50k words in only 30 days—no simple feat!

Here's how that schedule will likely play out:

* **.10 Release** - The `.10` release for each year will be the most important, as it is right before NaNoWriMo. It will implement any new features that help writers get content down faster and will also make sure the overall experience is stable to ensure no one gets any nasty surprises while writing their novels. In the future, we may provide the `.10` release as a Long-Term Support (LTS) release that continues to receive bug fixes and security patches year-round.
* **.11 Release** - Since November is during NaNoWriMo, there will ikely not be a release in this month most years. After all, I can't take much time out of my furious writing to code new features! There may be bug fixes to the `.10` release, but they will be added to it as a patch (for example, `v21.10.1` or `v21.10.2`).
* **.12 Release** - December is the beginning of the "Now What?" months, where writers nurse their sores and attempt to begin editing their novels. This release will mostly address issues brought up during NaNoWriMo, but will likely also include some new tools to help the revision process.
* **.01 Release** - See above.
* **.02 Release** - February will be the beginning of a new feature release season. We'll try out some new features, and hopefully some will stick.
* **.03 Release** - This is the second most important release of the year! April and July are Camp NaNoWriMo, which are chances for authors to experiment with new plot ideas and motivation methods. We'll likely add a few new features here for writers to play around with.
* **.04-.05 Releases** - This will likely be smaller releases, but may also be bigger since they're over the summer when I have more time to code.
* **.06 Release** - This is before the July Camp NaNoWriMo, so it'll likely implement feedback from the `.04` release.
* **.07-.09 Releases** - Fairly standard, building up for the next `.10` release.

## Conclusion
I hope that was illuminating. I'm personally very excited to try a new method of releasing software, and I hope it'll work well for us. Here's to a successful project!
