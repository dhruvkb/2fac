import { Octokit } from '@octokit/rest'

import { GitHubUser } from '@/models/github'

const REPO_NAME = '2fa-secrets'
const FILE_NAME = 'secrets.json'

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
  refName: string,
): Promise<File> => {
  const { data } = await client.repos.getContent({
    owner: username,
    repo: REPO_NAME,
    path: FILE_NAME,
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
  branchName: string,
  content: string,
  fileSha: string,
): Promise<void> => {
  await client.repos.createOrUpdateFileContents({
    owner: username,
    repo: REPO_NAME,
    branch: branchName,
    path: FILE_NAME,
    content: btoa(content),
    sha: fileSha,
    message: 'Update 2FA tokens',
  })
}

export const getDefaultBranch = async (
  client: Octokit,
  username: string,
): Promise<string> => {
  const { data: { default_branch: defaultBranch } } = await client.repos.get({
    owner: username,
    repo: REPO_NAME,
  })
  return defaultBranch
}

export const getBranchSha = async (
  client: Octokit,
  username: string,
  branchName: string,
): Promise<string> => {
  const { data: { object: { sha } } } = await client.git.getRef({
    owner: username,
    repo: REPO_NAME,
    ref: `heads/${branchName}`,
  })
  return sha
}

export const createNewBranch = async (
  client: Octokit,
  username: string,
  branchName: string,
  sha: string,
): Promise<void> => {
  await client.git.createRef({
    owner: username,
    repo: REPO_NAME,
    ref: `refs/heads/${branchName}`,
    sha,
  })
}
