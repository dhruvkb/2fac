import { Octokit } from '@octokit/rest'

import { GitHubUser } from '@/models/github'

interface File {
  sha?: string
  content?: string
}

export const getUserDetails = async (
  client: Octokit,
): Promise<GitHubUser> => {
  const {
    data: {
      name,
      login: username,
      avatar_url: avatarUrl,
    },
  } = await client.users.getAuthenticated()
  return {
    name,
    username,
    avatarUrl,
  }
}

export const getFile = async (
  client: Octokit,
  username: string,
  repoName: string,
  fileName: string,
  refName: string,
): Promise<File> => {
  const { data } = await client.repos.getContent({
    owner: username,
    repo: repoName,
    path: fileName,
    ref: refName,
  })

  const file: File = {}
  if ('sha' in data) {
    const { sha } = data
    file.sha = sha
  }
  if ('content' in data) {
    const { content } = data
    file.content = atob(content)
  }
  return file
}

export const updateFile = async (
  client: Octokit,
  username: string,
  repoName: string,
  branchName: string,
  fileName: string,
  content: string,
  fileSha: string,
): Promise<void> => {
  await client.repos.createOrUpdateFileContents({
    owner: username,
    repo: repoName,
    branch: branchName,
    path: fileName,
    content: btoa(content),
    sha: fileSha,
    message: 'Update 2FA tokens',
  })
}

export const getDefaultBranch = async (
  client: Octokit,
  username: string,
  repoName: string,
): Promise<string> => {
  const { data: { default_branch: defaultBranch } } = await client.repos.get({
    owner: username,
    repo: repoName,
  })
  return defaultBranch
}

export const getBranchSha = async (
  client: Octokit,
  username: string,
  repoName: string,
  branchName: string,
): Promise<string> => {
  const { data: { object: { sha } } } = await client.git.getRef({
    owner: username,
    repo: repoName,
    ref: `heads/${branchName}`,
  })
  return sha
}

export const createNewBranch = async (
  client: Octokit,
  username: string,
  repoName: string,
  branchName: string,
  sha: string,
): Promise<void> => {
  await client.git.createRef({
    owner: username,
    repo: repoName,
    ref: `refs/heads/${branchName}`,
    sha,
  })
}
