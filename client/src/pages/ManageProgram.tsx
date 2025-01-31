Add Group
                                      </Button>
                                    </div>

                                    <div className="space-y-4">
                                      {(form.watch(`intakes.${intakeIndex}.groups`) || []).map((group, groupIndex) => (
                                        <Card key={groupIndex}>
                                          <CardContent className="p-4 relative">
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              className="absolute top-2 right-2"
                                              onClick={() => removeGroup(intakeIndex, groupIndex)}
                                            >
                                              <X className="h-4 w-4" />
                                            </Button>

                                            <div className="space-y-4">
                                              <FormField
                                                control={form.control}
                                                name={`intakes.${intakeIndex}.groups.${groupIndex}.name`}
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel>Group Name</FormLabel>
                                                    <FormControl>
                                                      <Input {...field} className="bg-white" />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />

                                              <div className="grid md:grid-cols-2 gap-4">
                                                <FormField
                                                  control={form.control}
                                                  name={`intakes.${intakeIndex}.groups.${groupIndex}.capacity`}
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormLabel>Capacity</FormLabel>
                                                      <FormControl>
                                                        <Input
                                                          type="number"
                                                          {...field}
                                                          onChange={(e) =>
                                                            field.onChange(parseInt(e.target.value))
                                                          }
                                                          className="bg-white"
                                                        />
                                                      </FormControl>
                                                      <FormMessage />
                                                    </FormItem>
                                                  )}
                                                />

                                                <FormField
                                                  control={form.control}
                                                  name={`intakes.${intakeIndex}.groups.${groupIndex}.costPerStudent`}
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormLabel>Cost per Student</FormLabel>
                                                      <FormControl>
                                                        <Input
                                                          type="number"
                                                          {...field}
                                                          onChange={(e) =>
                                                            field.onChange(parseFloat(e.target.value))
                                                          }
                                                          className="bg-white"
                                                        />
                                                      </FormControl>
                                                      <FormMessage />
                                                    </FormItem>
                                                  )}
                                                />
                                              </div>

                                              <FormField
                                                control={form.control}
                                                name={`intakes.${intakeIndex}.groups.${groupIndex}.teacherIds`}
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel>Group Teachers</FormLabel>
                                                    <FormControl>
                                                      <PeoplePicker
                                                        people={teachers}
                                                        selectedIds={field.value}
                                                        onChange={field.onChange}
                                                        placeholder="Select group teachers"
                                                      />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />

                                              <FormField
                                                control={form.control}
                                                name={`intakes.${intakeIndex}.groups.${groupIndex}.moduleIds`}
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel>Group Modules</FormLabel>
                                                    <FormControl>
                                                      <select
                                                        multiple
                                                        {...field}
                                                        className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                                        value={field.value}
                                                        onChange={(e) => {
                                                          const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                                                          field.onChange(selectedOptions);
                                                        }}
                                                      >
                                                        {form.watch('modules')?.map((module, idx) => (
                                                          <option key={idx} value={idx}>
                                                            {module.name} ({module.credits} credits - ${module.costPerCredit}/credit)
                                                          </option>
                                                        ))}
                                                      </select>
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </FormSection>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/programs")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEdit ? "Update Program" : "Create Program"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}