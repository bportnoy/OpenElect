# Contributing

## Table of Contents

1. [General Workflow](#general-workflow)
1. [Detailed Workflow](#detailed-workflow)
    1. [Fork the repo](#fork-the-repo)
    1. [Be aware of your branch](#be-aware-of-your-branch)
    1. [Cut a namespaced branch](#cut-a-namespaced-branch-from-develop)
    1. [Make commits to your branch](#make-commits-to-your-branch)
    1. [Commit Message Guidelines](#commit-message-guidelines)
    1. [Locally test your changes](#locally-test-your-changes)
    1. [Rebase upstream changes into your branch](#rebase-upstream-changes-into-your-branch)
    1. [Get your feature implemented into the development branch](#get-your-feature-implemented-into-the-development-branch)
    1. [Make a pull request](#make-a-pull-request)
    1. [Guidelines](#guidelines)
1. [Workflow Summary](#workflow-summary)
1. [Checklist](#checklist)


Note:  Our project uses the many-branched git-workflow, it is recommended you add you current git-branch to your command-line.
  If you use bash look [here](http://code-worrier.com/blog/git-branch-in-bash-prompt/).
  Command line examples will include the faux bash command line: (Current_Branch)$

## General Workflow

1. Fork the repo
1. Cut a namespaced branch from master
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...

  e.g., "git checkout -b feat/linksView"

1. Make commits to your namespaced branch. Prefix each commit like so:
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...
1. When you've finished with your fix or feature, Rebase upstream changes into your branch. submit a pull request
   directly to the branch you modified. Include a description of your changes.
1. Your pull request will be reviewed by at least two other maintainers. The point of code
   reviews is to help keep the codebase clean, of high quality, and to help you grow as a programmer. If your code reviewer
   requests you make a change you don't understand, ask them why.
1. Fix any issues raised by your code reviwer, and push your fixes as a single
   new commit.
1. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

## Detailed Workflow

### Fork the repo

Use github’s interface to make a fork of the repo, then add that repo as an upstream remote:

```
git remote add upstream https://github.com/<SOURCE_OF_REPO>/<NAME_OF_REPO>.git
```

### Be aware of your branch

We are using the Git Workflow seen [here](http://reinh.com/blog/2009/03/02/a-git-workflow-for-agile-teams.html)
In summary:

  - Cut a feature branch on your local repository
  - Make changes in this feature branch
  - Locally test your feature branch
  - Merge with your master branch
  - Push to origin master
  - Submit a pull request

### Cut a namespaced branch from master

Your branch should follow this naming convention:
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...

These commands will help you do this:

``` bash

# Creates your branch and brings you there
(develop)$ git checkout -b `your-branch-name`
```

### Make commits to your branch.

Prefix each commit like so
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

A commit should be short, and include only *one logical change*.

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.
- Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on Mac OS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

[More information](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)

### Locally test your changes

In order to ensure as little group downtime as possible, please make sure the changes in your feature branch do not
cause any tests to fail.

For more information on test driven development, click [here](http://en.wikipedia.org/wiki/Test-driven_development)

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the master branch into yours by running this command
from your branch:

```bash
# Syntax                      FROM HERE:
(TO HERE)$ git pull --rebase (target repo) (target branch)
#e.g.,
(develop)$ git pull --rebase upstream master
```
(This changes the commit history on your local repo to match the upstream repo.  This
will allow pull requests to merge automatically and is a vitally important step)

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will start yelling at you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - you do not make commits during a
rebase.

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Get your feature implemented into the master branch
[(Ensure that you rebased your code onto upstream before doing this!)](#rebase-upstream-changes-into-your-branch)

Rebase your branch onto master.  This creates a cleaner commit history than using a merge.

```bash
#Syntax
(FROM HERE)$ git rebase (TO HERE)

#e.g.,
(your feature branch)$ git rebase master
#This will attach your feature to the develop branch, and implement it
```
Like upstream rebasing, you may need to ```git rebase --continue``` through merge conflicts.
After rebasing, confirm that your code has not broken anything.

Next, we want to use a merge --no-ff to logically separate your commit, while
maintaining a clean, linear commit history.

```bash
#Syntax:
(Parent Branch)$ git merge --no-ff (Rebased branch)

#e.g.,
(master)$ git merge --no-ff feat/docView
```

Now, push to your repository and make a pull request to the upstream repository:

### Make a pull request

Make a clear pull request from your fork and branch to the related upstream
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repository.

At least two other people MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code DRY
    - Apply the boy scout rule.
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the [tests][] before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
1. Your pull request is comprised of a single ([squashed][]) commit.

## Workflow Summary:

Pull from upstream master often to limit how many merge conflicts you have to do, and
pull from upstream before you prepare a personal pull request:

```bash
# Syntax                      FROM HERE:
(TO HERE)$ git pull --rebase (target repo) (target branch)
#e.g.,
(develop)$ git pull --rebase upstream master
```

Next, resolve any merge conflicts, using:
```bash
git rebase --continue
```
to proceed through the conflicts.

Next, rebase your working branch onto the development branch:
```bash
#Syntax
(Working branch)$ git rebase (parent branch)

#e.g.,
(your feature branch)$ git rebase master
#This will attach your feature to the master branch, and implement it
```

Next, merge --no-ff to maintain a clean commit history, and logically group changes:
```bash
#Syntax:
(Parent Branch)$ git merge --no-ff (Rebased branch)

#e.g.,
(develop)$ git merge --no-ff feat/docView
```

Then push to your personal repo:
```bash
#Syntax:
(inconsequential)$ git push (target repo) (local branch to push)

#e.g.,
(any)$ git push origin master
```

Finally, create a pull request.  Ensure that you are going from your repo's relevant branch to
the upstream repo's relevant branch.

## Checklist

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
 - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.


<!-- Links -->
[style guide]: https://github.com/hackreactor-labs/style-guide
[n-queens]: https://github.com/hackreactor-labs/n-queens
[Underbar]: https://github.com/hackreactor-labs/underbar
[curriculum workflow diagram]: http://i.imgur.com/p0e4tQK.png
[cons of merge]: https://f.cloud.github.com/assets/1577682/1458274/1391ac28-435e-11e3-88b6-69c85029c978.png
[Bookstrap]: https://github.com/hackreactor/bookstrap
[Taser]: https://github.com/hackreactor/bookstrap
[tools workflow diagram]: http://i.imgur.com/kzlrDj7.png
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model/
[GitHub Flow]: http://scottchacon.com/2011/08/31/github-flow.html
[Squash]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
