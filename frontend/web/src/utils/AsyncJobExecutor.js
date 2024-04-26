/**
 * AsyncJobExecutor.js
 *
 * @file A class to manage background job processing.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

/**
 * Represents a job to be executed.
 * @typedef {any} Job
 */

/**
 * Represents the identifier of a worker.
 * @typedef {string} WorkerId
 */

/**
 * AsyncJobExecutor class manages a background queue of jobs to be processed.
 * Jobs are executed by the provided worker function in the background.
 */
class AsyncJobExecutor {
  /**
   * Creates an instance of AsyncJobExecutor.
   */
  constructor() {
    /**
     * The array to store pending jobs.
     * @type {Array<{ workerId: WorkerId, job: Job }>}
     * @private
     */
    this.jobs = []

    /**
     * The worker function responsible for executing jobs.
     * @type {Object<WorkerId, (job: Job) => Promise<void>>}
     * @private
     */
    this.worker = {}

    /**
     * Flag indicating whether the queue processing must stop.
     * @type {boolean}
     * @private
     */
    this.stop = false

    // Start processing the queue
    this._run()
  }

  /**
   * Adds a worker to the executor.
   * @param {WorkerId} workerId - The identifier of the worker.
   * @param {(job: Job) => Promise<void>} worker - The worker function responsible for executing jobs.
   * @returns {this}
   */
  addWorker(workerId, worker) {
    this.worker[workerId] = worker
    return this
  }

  /**
   * Adds a job to the queue.
   * @param {WorkerId} workerId - The identifier of the worker responsible for the job.
   * @param {Job} job - The job function to be added to the queue.
   */
  addJob(workerId, job) {
    this.jobs.push({ workerId, job })
  }

  /**
   * Checks if the queue is empty.
   * @returns {boolean} True if the queue is empty, otherwise false.
   */
  isEmpty() {
    return this.jobs.length === 0
  }

  /**
   * Stops the queue processing.
   */
  halt() {
    this.stop = true
  }

  /**
   * Private method to continuously process the queue.
   * Waits for jobs and executes them using the worker function.
   * @private
   */
  async _run() {
    while (!this.stop) {
      if (!this.isEmpty()) {
        const { workerId, job } = this.jobs.shift()
        await this.worker[workerId](job)
      }

      while (this.isEmpty() && !this.stop) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }
  }
}

export default AsyncJobExecutor
